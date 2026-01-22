import { useCallback, useEffect, useRef } from 'react';
import type { ImageData, ImageState } from '@/types/image';
import { useLocalStorage } from './useLocalStorage';
import { checkStorageQuota } from '@/utils/storage';

const initialImageData: ImageData = {
  id: 'then',
  file: null,
  dataUrl: null,
  xPos: 50,
  yPos: 50,
  zoom: 1.0,
};

export function useImageState() {
  const [imageState, setImageState] = useLocalStorage<ImageState>('then-and-now-images', {
    then: { ...initialImageData, id: 'then' },
    now: { ...initialImageData, id: 'now' },
  });

  // Store user images separately - these are the "source of truth"
  const [userImages, setUserImages] = useLocalStorage<ImageState | null>('then-and-now-user-images', null);
  
  // Track if we've already restored user images to prevent loops
  const hasRestoredRef = useRef(false);

  // On component mount, ALWAYS restore user images if they exist
  useEffect(() => {
    // Check storage quota on mobile devices
    checkStorageQuota();
    
    // Always restore user images on page load/refresh if they exist
    if (userImages && (userImages.then.dataUrl || userImages.now.dataUrl)) {
      setImageState(userImages);
      hasRestoredRef.current = true;
    }
  }, []); // Only run on mount - this ensures user images are restored on every page refresh

  const updateImage = useCallback((id: 'then' | 'now', updates: Partial<ImageData>, isSample = false) => {
    const newImageData = { ...imageState[id], ...updates };
    
    // Always update the current display state
    setImageState(prev => ({
      ...prev,
      [id]: newImageData,
    }));

    // If this is a user image (not sample), save it as the persistent user image
    if (!isSample && updates.file) {
      const newUserImages = {
        then: userImages?.then || { ...initialImageData, id: 'then' },
        now: userImages?.now || { ...initialImageData, id: 'now' },
        [id]: newImageData,
      };
      
      setUserImages(newUserImages);
      hasRestoredRef.current = true; // Mark as having user data
    }
  }, [imageState, setImageState, userImages, setUserImages]);

  const removeImage = useCallback((id: 'then' | 'now') => {
    const resetData = { ...initialImageData, id };
    
    setImageState(prev => ({
      ...prev,
      [id]: resetData,
    }));

    // Also remove from user images
    setUserImages(prev => prev ? ({
      ...prev,
      [id]: resetData,
    }) : null);
  }, [setImageState, setUserImages]);

  return {
    imageState,
    updateImage,
    removeImage,
  };
}
