import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from '@heroui/button';
import { useEffect, useRef, useState } from 'react';
import type { ImageState } from '@/types/image';
import type { Settings } from '@/types/settings';
import { calculateCanvasDimensions, calculateSourceCrop, getArrowColor } from '@/utils/canvas';
import { drawArrow } from '@/utils/arrows';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageState: ImageState;
  settings: Settings;
  onExport: () => void;
}

export function PreviewModal({ isOpen, onClose, imageState, settings, onExport }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !imageState.then.dataUrl || !imageState.now.dataUrl) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      setIsLoading(true);

      const thenImg = new Image();
      const nowImg = new Image();

      thenImg.crossOrigin = 'anonymous';
      nowImg.crossOrigin = 'anonymous';

      Promise.all([
        new Promise((resolve, reject) => {
          thenImg.onload = () => resolve(null);
          thenImg.onerror = reject;
          thenImg.src = imageState.then.dataUrl!;
        }),
        new Promise((resolve, reject) => {
          nowImg.onload = () => resolve(null);
          nowImg.onerror = reject;
          nowImg.src = imageState.now.dataUrl!;
        })
      ]).then(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate proper dimensions based on aspect ratio
        const { width, height } = calculateCanvasDimensions(thenImg, nowImg, settings.aspectRatio);
        
        // Scale down for preview if too large
        const maxPreviewWidth = 1200;
        const scale = width > maxPreviewWidth ? maxPreviewWidth / width : 1;
        const previewWidth = Math.round(width * scale);
        const previewHeight = Math.round(height * scale);
        
        canvas.width = previewWidth;
        canvas.height = previewHeight;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        const halfWidth = previewWidth / 2;
        const halfHeight = previewHeight / 2;
        ctx.clearRect(0, 0, previewWidth, previewHeight);

        // Check if this is a vertical layout
        const isVertical = previewHeight > previewWidth;

        if (isVertical) {
          // Vertical layout: stack images top and bottom
          // Calculate crop for "then" image (top half)
          const thenCrop = calculateSourceCrop(thenImg, imageState.then, previewWidth, halfHeight);
          ctx.drawImage(
            thenImg,
            thenCrop.sx,
            thenCrop.sy,
            thenCrop.sWidth,
            thenCrop.sHeight,
            0,
            0,
            previewWidth,
            halfHeight
          );

          // Calculate crop for "now" image (bottom half)
          const nowCrop = calculateSourceCrop(nowImg, imageState.now, previewWidth, halfHeight);
          ctx.drawImage(
            nowImg,
            nowCrop.sx,
            nowCrop.sy,
            nowCrop.sWidth,
            nowCrop.sHeight,
            0,
            halfHeight,
            previewWidth,
            halfHeight
          );
        } else {
          // Horizontal layout: side by side
          // Calculate crop for "then" image (left half)
          const thenCrop = calculateSourceCrop(thenImg, imageState.then, halfWidth, previewHeight);
          ctx.drawImage(
            thenImg,
            thenCrop.sx,
            thenCrop.sy,
            thenCrop.sWidth,
            thenCrop.sHeight,
            0,
            0,
            halfWidth,
            previewHeight
          );

          // Calculate crop for "now" image (right half)
          const nowCrop = calculateSourceCrop(nowImg, imageState.now, halfWidth, previewHeight);
          ctx.drawImage(
            nowImg,
            nowCrop.sx,
            nowCrop.sy,
            nowCrop.sWidth,
            nowCrop.sHeight,
            halfWidth,
            0,
            halfWidth,
            previewHeight
          );
        }

        // Draw labels in corners
        const fontSize = Math.max(48, Math.min(previewWidth, previewHeight) * 0.08);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textBaseline = 'top';
        const padding = fontSize * 0.4;
        
        if (isVertical) {
          // Vertical layout: labels at top-left and bottom-left
          ctx.textAlign = 'left';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = Math.max(2, fontSize * 0.1);
          
          // "Then" label - top left
          ctx.strokeText(settings.thenLabel, padding, padding);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(settings.thenLabel, padding, padding);
          
          // "Now" label - bottom left
          ctx.strokeText(settings.nowLabel, padding, halfHeight + padding);
          ctx.fillText(settings.nowLabel, padding, halfHeight + padding);
        } else {
          // Horizontal layout: labels at top-left and top-right
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = Math.max(2, fontSize * 0.1);
          
          // "Then" label - top left
          ctx.textAlign = 'left';
          ctx.strokeText(settings.thenLabel, padding, padding);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(settings.thenLabel, padding, padding);
          
          // "Now" label - top right
          ctx.textAlign = 'right';
          ctx.strokeText(settings.nowLabel, previewWidth - padding, padding);
          ctx.fillText(settings.nowLabel, previewWidth - padding, padding);
        }

        // Draw arrow in center - handle vertical vs horizontal layouts
        const arrowSize = Math.min(previewWidth, previewHeight) * 0.12;
        const arrowColor = getArrowColor(settings.arrowColor);
        
        if (isVertical) {
          // For vertical layouts, rotate the arrow 90 degrees and position at center
          ctx.save();
          ctx.translate(previewWidth / 2, halfHeight);
          ctx.rotate(Math.PI / 2); // 90 degrees clockwise
          drawArrow(ctx, 0, 0, arrowSize, settings.arrowStyle, arrowColor);
          ctx.restore();
        } else {
          // For horizontal layouts, draw arrow normally at center
          drawArrow(ctx, halfWidth, previewHeight / 2, arrowSize, settings.arrowStyle, arrowColor);
        }

        setIsLoading(false);
      }).catch((err) => {
        console.error('Failed to load images:', err);
        setIsLoading(false);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, imageState, settings]);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={(open) => !open && onClose()} 
      size="5xl"
      placement="bottom"
      classNames={{
        base: "lg:max-w-5xl m-0 lg:m-auto mb-0 lg:mb-auto rounded-b-none lg:rounded-b-lg",
        body: "p-3 lg:p-6",
        backdrop: "bg-black/80",
        wrapper: "items-end lg:items-center",
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="text-lg lg:text-xl px-3 lg:px-6 py-3 lg:py-4">Preview Comparison</ModalHeader>
        <ModalBody>
          <div className="bg-gray-900 rounded-lg p-2 lg:p-4 relative">
            <canvas ref={canvasRef} className="w-full h-auto rounded" />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 rounded-lg">
                <p className="text-gray-400 text-base">Generating preview...</p>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 px-3 lg:px-6 py-3 lg:py-4">
          <Button variant="ghost" onPress={onClose} size="md" className="flex-1 lg:flex-none text-sm">
            Cancel
          </Button>
          <Button color="primary" onPress={onExport} disabled={isLoading} size="md" className="flex-1 lg:flex-none text-sm">
            Export Image
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
