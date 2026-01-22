export function calculateCoverScale(
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number
): number {
  return Math.max(
    containerWidth / imageWidth,
    containerHeight / imageHeight
  );
}

export function calculateOffset(
  imageSize: number,
  containerSize: number,
  posPercent: number
): number {
  const overflow = imageSize - containerSize;
  if (overflow <= 0) return 0;
  return -(overflow * (posPercent / 100));
}

export function clampZoom(zoom: number, min = 1.0, max = 3.0): number {
  return Math.max(min, Math.min(max, zoom));
}

export function clampPosition(pos: number): number {
  return Math.max(0, Math.min(100, pos));
}

export interface TransformValues {
  scale: number;
  translateX: number;
  translateY: number;
}

export function calculateTransform(
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number,
  xPos: number,
  yPos: number,
  zoom: number
): TransformValues {
  const baseScale = calculateCoverScale(imageWidth, imageHeight, containerWidth, containerHeight);
  const scale = baseScale * zoom;
  
  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;
  
  const translateX = calculateOffset(scaledWidth, containerWidth, xPos);
  const translateY = calculateOffset(scaledHeight, containerHeight, yPos);
  
  return { scale, translateX, translateY };
}
