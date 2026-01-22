import { useCallback, useEffect } from 'react';
import type { ImageData, ImageState } from '@/types/image';
import { useLocalStorage } from './useLocalStorage';

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

  // On component mount, restore user images if they exist
  useEffect(() => {
    if (userImages && (userImages.then.dataUrl || userImages.now.dataUrl)) {
      setImageState(userImages);
    }
  }, []); // Only run on mount

  const updateImage = useCallback((id: 'then' | 'now', updates: Partial<ImageData>, isSample = false) => {
    const newImageData = { ...imageState[id], ...updates };
    
    setImageState(prev => ({
      ...prev,
      [id]: newImageData,
    }));

    // If this is a user image (not sample), save it as the persistent user image
    if (!isSample && updates.file) {
      setUserImages(prev => ({
        then: prev?.then || { ...initialImageData, id: 'then' },
        now: prev?.now || { ...initialImageData, id: 'now' },
        [id]: newImageData,
      }));
    }
  }, [imageState, setImageState, setUserImages]);

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
