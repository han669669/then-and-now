export interface ImageData {
  id: 'then' | 'now';
  file: File | null;
  dataUrl: string | null;      // Deprecated - use objectUrl instead
  objectUrl: string | null;    // Object URL for display (memory efficient)
  hasStoredBlob: boolean;      // Whether there's a blob in IndexedDB
  xPos: number; // 0-100 percentage
  yPos: number; // 0-100 percentage
  zoom: number; // 1.0-3.0
}

// Metadata stored in localStorage (small, fast)
export interface ImageMetadata {
  id: 'then' | 'now';
  hasStoredBlob: boolean;
  xPos: number;
  yPos: number;
  zoom: number;
}

export interface MetadataState {
  then: ImageMetadata;
  now: ImageMetadata;
}

export interface ImageDimensions {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
}

export interface ImageState {
  then: ImageData;
  now: ImageData;
}
