export interface ImageData {
  id: 'then' | 'now';
  file: File | null;
  dataUrl: string | null;
  xPos: number; // 0-100 percentage
  yPos: number; // 0-100 percentage
  zoom: number; // 1.0-3.0
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
