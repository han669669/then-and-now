import { useCallback, useEffect, useRef, useState } from 'react';
import type { ImageData, ImageState, ImageMetadata, MetadataState } from '@/types/image';
import { useLocalStorage } from './useLocalStorage';
import { 
  saveImageBlob, 
  loadImageBlob, 
  deleteImageBlob,
  createObjectURLFromBlob,
  revokeObjectURL 
} from '@/utils/indexedDB';
import { checkStorageQuota } from '@/utils/storage';

const initialImageData: ImageData = {
  id: 'then',
  file: null,
  dataUrl: null,
  objectUrl: null,
  hasStoredBlob: false,
  xPos: 50,
  yPos: 50,
  zoom: 1.0,
};

const initialMetadata: ImageMetadata = {
  id: 'then',
  hasStoredBlob: false,
  xPos: 50,
  yPos: 50,
  zoom: 1.0,
};

export function useImageState() {
  // In-memory state for display (includes object URLs)
  const [imageState, setImageState] = useState<ImageState>({
    then: { ...initialImageData, id: 'then' },
    now: { ...initialImageData, id: 'now' },
  });

  // Only metadata in localStorage (tiny - just position/zoom/hasBlob flags)
  const [metadata, setMetadata] = useLocalStorage<MetadataState>('then-and-now-metadata', {
    then: { ...initialMetadata, id: 'then' },
    now: { ...initialMetadata, id: 'now' },
  });

  // Track which images have been loaded from IndexedDB (per-image, not global)
  const loadedFromDBRef = useRef<{ then: boolean; now: boolean }>({ then: false, now: false });

  // Track object URLs for cleanup
  const objectUrlsRef = useRef<{ then: string | null; now: string | null }>({
    then: null,
    now: null,
  });

  // Track if initial cleanup has run
  const hasCleanedUpRef = useRef(false);

  // Track hydration status
  const [hydrated, setHydrated] = useState(false);

  // Load images from IndexedDB when metadata indicates blobs exist
  // Uses per-image gating to prevent repeated loads
  useEffect(() => {
    // Run cleanup once
    if (!hasCleanedUpRef.current) {
      hasCleanedUpRef.current = true;
      checkStorageQuota();
    }

    const loadStoredImages = async () => {
      const loadImage = async (id: 'then' | 'now'): Promise<string | null> => {
        // Skip if no blob stored according to metadata
        if (!metadata[id].hasStoredBlob) {
          return null;
        }
        
        // Skip if already successfully loaded this image
        if (loadedFromDBRef.current[id]) {
          return null;
        }
        
        try {
          const blob = await loadImageBlob(id);
          if (blob) {
            const objectUrl = createObjectURLFromBlob(blob);
            
            // Revoke old URL if exists
            if (objectUrlsRef.current[id] && objectUrlsRef.current[id] !== objectUrl) {
              revokeObjectURL(objectUrlsRef.current[id]!);
            }
            objectUrlsRef.current[id] = objectUrl;
            
            // Mark as loaded only after successful load
            loadedFromDBRef.current[id] = true;
            
            return objectUrl;
          } else {
            // Blob missing from IndexedDB but metadata says it exists - heal the state
            console.warn(`Blob missing for ${id}, clearing metadata flag`);
            setMetadata(prev => ({
              ...prev,
              [id]: { ...prev[id], hasStoredBlob: false },
            }));
            // Mark as "loaded" to prevent infinite retry loops for missing blobs
            loadedFromDBRef.current[id] = true;
          }
        } catch (error) {
          console.error(`Failed to load ${id} image:`, error);
          // Don't set loadedFromDBRef on error - allows retry on next effect run
        }
        return null;
      };

      const [thenUrl, nowUrl] = await Promise.all([
        loadImage('then'),
        loadImage('now'),
      ]);

      // Only update state for images that were actually loaded
      if (thenUrl || nowUrl) {
        setImageState(prev => ({
          then: thenUrl ? {
            ...prev.then,
            objectUrl: thenUrl,
            dataUrl: thenUrl,
            hasStoredBlob: true,
            xPos: metadata.then.xPos,
            yPos: metadata.then.yPos,
            zoom: metadata.then.zoom,
          } : prev.then,
          now: nowUrl ? {
            ...prev.now,
            objectUrl: nowUrl,
            dataUrl: nowUrl,
            hasStoredBlob: true,
            xPos: metadata.now.xPos,
            yPos: metadata.now.yPos,
            zoom: metadata.now.zoom,
          } : prev.now,
        }));
      }

      // Mark as hydrated after first load attempt
      setHydrated(true);
    };

    loadStoredImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- setMetadata is stable from useLocalStorage
  }, [metadata.then.hasStoredBlob, metadata.now.hasStoredBlob]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (objectUrlsRef.current.then) {
        revokeObjectURL(objectUrlsRef.current.then);
      }
      if (objectUrlsRef.current.now) {
        revokeObjectURL(objectUrlsRef.current.now);
      }
    };
  }, []);

  // Update image - handles both blob storage and metadata
  const updateImage = useCallback(async (
    id: 'then' | 'now', 
    updates: Partial<ImageData>, 
    blob?: Blob,
    isSample = false
  ) => {
    // Track blob storage status separately to avoid mutating the updates parameter
    let hasStoredBlob: boolean | undefined = updates.hasStoredBlob;
    
    // If we have a new blob and it's NOT a sample, store it in IndexedDB
    if (blob && !isSample) {
      try {
        await saveImageBlob(id, blob);
        hasStoredBlob = true;
        // Mark as loaded so we don't try to reload it
        loadedFromDBRef.current[id] = true;
      } catch (error) {
        console.error(`Failed to save ${id} blob:`, error);
        // Explicitly mark as NOT stored to prevent state desync on reload
        // Without this, metadata might retain old hasStoredBlob=true while
        // IndexedDB has stale/missing data
        hasStoredBlob = false;
      }
    }

    // Merge updates with computed hasStoredBlob (immutable approach)
    const finalUpdates = hasStoredBlob !== undefined 
      ? { ...updates, hasStoredBlob } 
      : updates;

    // Update in-memory state
    setImageState(prev => ({
      ...prev,
      [id]: { ...prev[id], ...finalUpdates },
    }));

    // ONLY update metadata if NOT a sample image
    // This prevents samples from overwriting user's persisted data
    if (!isSample) {
      setMetadata(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          hasStoredBlob: finalUpdates.hasStoredBlob ?? prev[id].hasStoredBlob,
          xPos: finalUpdates.xPos ?? prev[id].xPos,
          yPos: finalUpdates.yPos ?? prev[id].yPos,
          zoom: finalUpdates.zoom ?? prev[id].zoom,
        },
      }));
    }

    // Track new object URL
    if (finalUpdates.objectUrl) {
      // Revoke old URL first
      if (objectUrlsRef.current[id] && objectUrlsRef.current[id] !== finalUpdates.objectUrl) {
        revokeObjectURL(objectUrlsRef.current[id]!);
      }
      objectUrlsRef.current[id] = finalUpdates.objectUrl;
    }
  }, [setMetadata]);

  // Update just the transform (position/zoom) - for zoom events
  const updateTransform = useCallback((
    id: 'then' | 'now',
    updates: { xPos?: number; yPos?: number; zoom?: number }
  ) => {
    // Update in-memory state immediately for smooth UI
    setImageState(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));
  }, []);

  // Persist transform to localStorage - call this on zoom END, not during
  const persistTransform = useCallback((id: 'then' | 'now') => {
    setImageState(current => {
      const data = current[id];
      setMetadata(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          xPos: data.xPos,
          yPos: data.yPos,
          zoom: data.zoom,
        },
      }));
      return current;
    });
  }, [setMetadata]);

  const removeImage = useCallback(async (id: 'then' | 'now') => {
    // Revoke object URL
    if (objectUrlsRef.current[id]) {
      revokeObjectURL(objectUrlsRef.current[id]!);
      objectUrlsRef.current[id] = null;
    }

    // Reset the loaded flag so future uploads work correctly
    loadedFromDBRef.current[id] = false;

    // Delete from IndexedDB
    try {
      await deleteImageBlob(id);
    } catch (error) {
      console.error(`Failed to delete ${id} blob:`, error);
    }

    // Reset state
    const resetData: ImageData = { ...initialImageData, id };
    setImageState(prev => ({
      ...prev,
      [id]: resetData,
    }));

    // Reset metadata
    setMetadata(prev => ({
      ...prev,
      [id]: { ...initialMetadata, id },
    }));
  }, [setMetadata]);

  // Computed values for UI
  const hasPersistedImages = metadata.then.hasStoredBlob || metadata.now.hasStoredBlob;

  return {
    imageState,
    updateImage,
    updateTransform,
    persistTransform,
    removeImage,
    hydrated,
    hasPersistedImages,
  };
}
