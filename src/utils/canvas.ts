import type { ImageData } from '@/types/image';
import type { AspectRatioValue } from '@/types/settings';

export function getAspectRatioValue(aspectRatio: string): AspectRatioValue | null {
  const ratios: Record<string, AspectRatioValue> = {
    '16:9': { width: 16, height: 9 },
    '9:16': { width: 9, height: 16 },
    '21:9': { width: 21, height: 9 },
    '3:4': { width: 3, height: 4 },
    '4:3': { width: 4, height: 3 },
  };
  return ratios[aspectRatio] || null;
}

export function calculateCanvasDimensions(
  thenImage: HTMLImageElement,
  nowImage: HTMLImageElement,
  aspectRatio: string
): { width: number; height: number } {
  if (aspectRatio === 'auto') {
    // Smart auto mode with optimized cropping
    const thenAspect = thenImage.naturalWidth / thenImage.naturalHeight;
    const nowAspect = nowImage.naturalWidth / nowImage.naturalHeight;
    
    // Calculate average aspect ratio of both images
    const avgAspect = (thenAspect + nowAspect) / 2;
    
    // Use the maximum height as base
    const baseHeight = Math.max(thenImage.naturalHeight, nowImage.naturalHeight);
    
    // Clamp the final aspect ratio to reasonable bounds (between 4:3 and 21:9)
    const minAspect = 4/3; // 1.33
    const maxAspect = 21/9; // 2.33
    const finalAspect = Math.max(minAspect, Math.min(maxAspect, avgAspect));
    
    const finalWidth = Math.round(baseHeight * finalAspect);
    
    return { width: finalWidth, height: baseHeight };
  }

  const ratio = getAspectRatioValue(aspectRatio);
  if (!ratio) return { width: 1920, height: 1080 };

  // Use a reasonable base resolution
  const baseHeight = Math.max(thenImage.naturalHeight, nowImage.naturalHeight, 1080);
  const width = Math.round((baseHeight * ratio.width) / ratio.height);
  
  return { width, height: baseHeight };
}

export interface SourceCropRect {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
}

/**
 * Calculate source crop rectangle for object-fit: cover behavior
 * xPos and yPos represent where to position the crop (0 = left/top, 50 = center, 100 = right/bottom)
 */
export function calculateSourceCrop(
  image: HTMLImageElement,
  imageData: ImageData,
  targetWidth: number,
  targetHeight: number
): SourceCropRect {
  const { naturalWidth: imgWidth, naturalHeight: imgHeight } = image;
  const { xPos, yPos, zoom } = imageData;

  // Calculate the aspect ratio of target area
  const targetAspectRatio = targetWidth / targetHeight;
  const imageAspectRatio = imgWidth / imgHeight;

  // Calculate crop dimensions to achieve cover behavior
  let cropWidth: number;
  let cropHeight: number;

  if (targetAspectRatio >= imageAspectRatio) {
    // Target is wider than image - crop height
    cropWidth = imgWidth;
    cropHeight = imgWidth / targetAspectRatio;
  } else {
    // Target is taller than image - crop width
    cropWidth = imgHeight * targetAspectRatio;
    cropHeight = imgHeight;
  }

  // Apply zoom by reducing crop area
  cropWidth = cropWidth / zoom;
  cropHeight = cropHeight / zoom;

  // Ensure crop doesn't exceed image bounds
  cropWidth = Math.min(cropWidth, imgWidth);
  cropHeight = Math.min(cropHeight, imgHeight);

  // Calculate crop position based on xPos and yPos (0-100 percentages)
  const maxOffsetX = Math.max(0, imgWidth - cropWidth);
  const maxOffsetY = Math.max(0, imgHeight - cropHeight);

  let sx = (maxOffsetX * xPos) / 100;
  let sy = (maxOffsetY * yPos) / 100;

  // Clamp to valid bounds
  sx = Math.max(0, Math.min(sx, maxOffsetX));
  sy = Math.max(0, Math.min(sy, maxOffsetY));

  return {
    sx: Math.round(sx),
    sy: Math.round(sy),
    sWidth: Math.round(cropWidth),
    sHeight: Math.round(cropHeight),
  };
}

export function getArrowColor(color: string): string {
  const colors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    red: '#ef4444',
  };
  return colors[color] || '#ffffff';
}


