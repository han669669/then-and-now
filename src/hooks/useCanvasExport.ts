import { useCallback } from 'react';
import type { ImageState } from '@/types/image';
import type { Settings } from '@/types/settings';
import {
  calculateCanvasDimensions,
  calculateSourceCrop,
  getArrowColor,
} from '@/utils/canvas';
import { drawArrow } from '@/utils/arrows';

export function useCanvasExport() {
  const exportImage = useCallback(
    async (
      imageState: ImageState,
      settings: Settings
    ): Promise<void> => {
      const { then: thenData, now: nowData } = imageState;

      if (!thenData.dataUrl || !nowData.dataUrl) {
        throw new Error('Both images must be uploaded');
      }

      // Load images
      const [thenImg, nowImg] = await Promise.all([
        loadImage(thenData.dataUrl),
        loadImage(nowData.dataUrl),
      ]);

      // Calculate canvas dimensions
      const { width, height } = calculateCanvasDimensions(
        thenImg,
        nowImg,
        settings.aspectRatio
      );

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      // Check if this is a vertical layout
      const isVertical = height > width;
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      if (isVertical) {
        // Vertical layout: stack images top and bottom
        // Draw "Then" image (top half)
        const thenCrop = calculateSourceCrop(thenImg, thenData, width, halfHeight);
        ctx.drawImage(
          thenImg,
          thenCrop.sx,
          thenCrop.sy,
          thenCrop.sWidth,
          thenCrop.sHeight,
          0,
          0,
          width,
          halfHeight
        );

        // Draw "Now" image (bottom half)
        const nowCrop = calculateSourceCrop(nowImg, nowData, width, halfHeight);
        ctx.drawImage(
          nowImg,
          nowCrop.sx,
          nowCrop.sy,
          nowCrop.sWidth,
          nowCrop.sHeight,
          0,
          halfHeight,
          width,
          halfHeight
        );
      } else {
        // Horizontal layout: side by side
        // Draw "Then" image (left half)
        const thenCrop = calculateSourceCrop(thenImg, thenData, halfWidth, height);
        ctx.drawImage(
          thenImg,
          thenCrop.sx,
          thenCrop.sy,
          thenCrop.sWidth,
          thenCrop.sHeight,
          0,
          0,
          halfWidth,
          height
        );

        // Draw "Now" image (right half)
        const nowCrop = calculateSourceCrop(nowImg, nowData, halfWidth, height);
        ctx.drawImage(
          nowImg,
          nowCrop.sx,
          nowCrop.sy,
          nowCrop.sWidth,
          nowCrop.sHeight,
          halfWidth,
          0,
          halfWidth,
          height
        );
      }

      // Draw labels and arrow based on layout
      const fontSize = Math.max(24, Math.min(width, height) * 0.05);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textBaseline = 'top';

      const labelPadding = fontSize * 0.5;
      const strokeWidth = fontSize * 0.1;

      if (isVertical) {
        // Vertical layout: labels at top-left and bottom-left
        ctx.textAlign = 'left';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = strokeWidth;
        
        // "Then" label - top left
        ctx.strokeText(settings.thenLabel, labelPadding, labelPadding);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(settings.thenLabel, labelPadding, labelPadding);
        
        // "Now" label - bottom left
        ctx.strokeText(settings.nowLabel, labelPadding, halfHeight + labelPadding);
        ctx.fillText(settings.nowLabel, labelPadding, halfHeight + labelPadding);

        // Draw arrow in center - rotated 90 degrees for vertical
        const arrowSize = Math.min(width, height) * 0.12;
        const arrowColor = getArrowColor(settings.arrowColor);
        ctx.save();
        ctx.translate(width / 2, halfHeight);
        ctx.rotate(Math.PI / 2); // 90 degrees clockwise
        drawArrow(ctx, 0, 0, arrowSize, settings.arrowStyle, arrowColor);
        ctx.restore();
      } else {
        // Horizontal layout: labels at top-left and top-right
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = strokeWidth;
        
        // "Then" label - top left
        ctx.textAlign = 'left';
        ctx.strokeText(settings.thenLabel, labelPadding, labelPadding);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(settings.thenLabel, labelPadding, labelPadding);
        
        // "Now" label - top right
        ctx.textAlign = 'right';
        ctx.strokeText(settings.nowLabel, width - labelPadding, labelPadding);
        ctx.fillText(settings.nowLabel, width - labelPadding, labelPadding);

        // Draw arrow in center
        const arrowSize = Math.min(width, height) * 0.12;
        const arrowColor = getArrowColor(settings.arrowColor);
        drawArrow(ctx, halfWidth, height / 2, arrowSize, settings.arrowStyle, arrowColor);
      }

      // Export as PNG
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create blob');
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `then_and_now_${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    },
    []
  );

  return { exportImage };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
