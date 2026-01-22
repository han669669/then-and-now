import { useCallback } from 'react';
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

  const updateImage = useCallback((id: 'then' | 'now', updates: Partial<ImageData>) => {
    setImageState(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));
  }, [setImageState]);

  const removeImage = useCallback((id: 'then' | 'now') => {
    setImageState(prev => ({
      ...prev,
      [id]: { ...initialImageData, id },
    }));
  }, [setImageState]);

  const loadSampleImages = useCallback(async () => {
    // Will be implemented with sample image loading
    console.log('Sample images not yet implemented');
  }, []);

  return {
    imageState,
    updateImage,
    removeImage,
    loadSampleImages,
  };
}
