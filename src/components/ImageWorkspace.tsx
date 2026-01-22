import { useRef, useEffect } from 'react';
import { select } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity, ZoomBehavior } from 'd3-zoom';
import { Button } from '@heroui/react';
import { ZoomControls } from './ZoomControls';
import type { ImageData } from '@/types/image';

interface Props {
  id: 'then' | 'now';
  imageData: ImageData;
  onUpdate: (id: 'then' | 'now', updates: Partial<ImageData>) => void;
  onUpload: (id: 'then' | 'now', file: File) => void;
  onRemove: (id: 'then' | 'now') => void;
}

export function ImageWorkspace({ id, imageData, onUpdate, onUpload, onRemove }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<HTMLDivElement, unknown> | null>(null);
  const baseScaleRef = useRef<number>(1);

  // Ensure zoom is always valid
  const safeZoom = isNaN(imageData.zoom) || imageData.zoom < 1 ? 1.0 : imageData.zoom;

  // Function to programmatically reset the transform
  const resetTransform = () => {
    if (!containerRef.current || !zoomBehaviorRef.current || !imageRef.current) return;
    
    const container = select(containerRef.current);
    const containerRect = containerRef.current.getBoundingClientRect();
    const imgWidth = imageRef.current.naturalWidth;
    const imgHeight = imageRef.current.naturalHeight;
    
    if (!imgWidth || !imgHeight) return;
    
    const baseScale = baseScaleRef.current;
    const currentScale = baseScale * 1.0; // Reset zoom to 1.0
    const scaledWidth = imgWidth * currentScale;
    const scaledHeight = imgHeight * currentScale;
    
    const maxOffsetX = Math.max(0, scaledWidth - containerRect.width);
    const maxOffsetY = Math.max(0, scaledHeight - containerRect.height);
    
    const x = -(maxOffsetX * 50) / 100; // Reset to center (50%)
    const y = -(maxOffsetY * 50) / 100; // Reset to center (50%)
    
    container.call(
      zoomBehaviorRef.current.transform,
      zoomIdentity.translate(x, y).scale(currentScale)
    );
  };

  useEffect(() => {
    if (!containerRef.current || !imageData.dataUrl || !imageRef.current) return;

    const container = select(containerRef.current);
    const img = imageRef.current;
    
    // Wait for image to load
    const handleImageLoad = () => {
      if (!containerRef.current || !imageRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const imgWidth = imageRef.current.naturalWidth;
      const imgHeight = imageRef.current.naturalHeight;
      
      // Calculate scale to fit image (cover behavior)
      const scaleX = containerRect.width / imgWidth;
      const scaleY = containerRect.height / imgHeight;
      const baseScale = Math.max(scaleX, scaleY);
      baseScaleRef.current = baseScale;
      
      const zoomBehavior = d3Zoom<HTMLDivElement, unknown>()
        .scaleExtent([baseScale, baseScale * 3])
        .filter((event) => {
          // Allow touch events and mouse events
          return !event.ctrlKey && !event.button;
        })
        .on('zoom', (event) => {
          if (!imageRef.current || !containerRef.current) return;
          
          const { transform } = event;
          
          select(imageRef.current)
            .style('transform', `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`)
            .style('transform-origin', '0 0');
          
          // Calculate position percentages based on transform
          const scaledWidth = imgWidth * transform.k;
          const scaledHeight = imgHeight * transform.k;
          const maxOffsetX = Math.max(0, scaledWidth - containerRect.width);
          const maxOffsetY = Math.max(0, scaledHeight - containerRect.height);
          
          const xPercent = maxOffsetX > 0 ? (-transform.x / maxOffsetX) * 100 : 50;
          const yPercent = maxOffsetY > 0 ? (-transform.y / maxOffsetY) * 100 : 50;
          
          const newZoom = transform.k / baseScale;
          const newXPos = Math.max(0, Math.min(100, xPercent));
          const newYPos = Math.max(0, Math.min(100, yPercent));
          
          // Only update if values actually changed to avoid infinite loops
          if (
            Math.abs(newZoom - imageData.zoom) > 0.001 ||
            Math.abs(newXPos - imageData.xPos) > 0.1 ||
            Math.abs(newYPos - imageData.yPos) > 0.1
          ) {
            onUpdate(id, {
              zoom: newZoom,
              xPos: newXPos,
              yPos: newYPos,
            });
          }
        });

      container.call(zoomBehavior);
      zoomBehaviorRef.current = zoomBehavior;

      // Apply initial transform based on saved state
      const currentScale = baseScale * safeZoom;
      const scaledWidth = imgWidth * currentScale;
      const scaledHeight = imgHeight * currentScale;
      
      const maxOffsetX = Math.max(0, scaledWidth - containerRect.width);
      const maxOffsetY = Math.max(0, scaledHeight - containerRect.height);
      
      const x = -(maxOffsetX * imageData.xPos) / 100;
      const y = -(maxOffsetY * imageData.yPos) / 100;
      
      container.call(
        zoomBehavior.transform,
        zoomIdentity.translate(x, y).scale(currentScale)
      );
      
      // Ensure state is synced with the initial transform
      // This is crucial for the preview to work on first load
      const xPercent = maxOffsetX > 0 ? (-x / maxOffsetX) * 100 : 50;
      const yPercent = maxOffsetY > 0 ? (-y / maxOffsetY) * 100 : 50;
      
      onUpdate(id, {
        zoom: safeZoom,
        xPos: Math.max(0, Math.min(100, xPercent)),
        yPos: Math.max(0, Math.min(100, yPercent)),
      });
    };
    
    if (img.complete && img.naturalWidth > 0) {
      handleImageLoad();
    } else {
      img.addEventListener('load', handleImageLoad);
      return () => {
        img.removeEventListener('load', handleImageLoad);
        container.on('.zoom', null);
      };
    }

    return () => {
      container.on('.zoom', null);
    };
  }, [imageData.dataUrl]);

  useEffect(() => {
    if (!containerRef.current || !zoomBehaviorRef.current || !imageRef.current) return;
    
    const container = select(containerRef.current);
    const containerRect = containerRef.current.getBoundingClientRect();
    const imgWidth = imageRef.current.naturalWidth;
    const imgHeight = imageRef.current.naturalHeight;
    
    if (!imgWidth || !imgHeight) return;
    
    const baseScale = baseScaleRef.current;
    const currentScale = baseScale * safeZoom;
    const scaledWidth = imgWidth * currentScale;
    const scaledHeight = imgHeight * currentScale;
    
    const maxOffsetX = Math.max(0, scaledWidth - containerRect.width);
    const maxOffsetY = Math.max(0, scaledHeight - containerRect.height);
    
    const x = -(maxOffsetX * imageData.xPos) / 100;
    const y = -(maxOffsetY * imageData.yPos) / 100;
    
    container.call(
      zoomBehaviorRef.current.transform,
      zoomIdentity.translate(x, y).scale(currentScale)
    );
  }, [safeZoom]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(id, file);
    }
  };

  if (!imageData.dataUrl) {
    return (
      <div className="space-y-3 h-full flex flex-col">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">
          {id === 'then' ? 'Before' : 'After'}
        </h3>
        <div
          className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border-2 border-dashed border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer overflow-hidden flex-1"
          onClick={() => fileInputRef.current?.click()}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-gray-600 group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-gray-300 font-medium mb-1">
                Click to upload {id === 'then' ? 'before' : 'after'} image
              </p>
              <p className="text-gray-600 text-sm">PNG, JPG, WebP • Max 10MB</p>
            </div>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          id={`file-input-${id}`}
          name={`${id}Image`}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          aria-label={`Upload ${id === 'then' ? 'before' : 'after'} image`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2 h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          {id === 'then' ? 'Before' : 'After'}
        </h3>
        <div className="flex items-center gap-1.5">
          <ZoomControls
            zoom={safeZoom}
            xPos={imageData.xPos}
            yPos={imageData.yPos}
            onZoomChange={(zoom) => onUpdate(id, { zoom })}
            onReset={() => {
              // First update the state
              onUpdate(id, { zoom: 1.0, xPos: 50, yPos: 50 });
              // Then immediately reset the visual transform
              resetTransform();
            }}
          />
          <Button
            size="sm"
            variant="light"
            color="danger"
            onPress={() => onRemove(id)}
            className="min-w-0 px-2 h-8 text-xs"
          >
            Remove
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative bg-gray-950 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing shadow-xl border border-gray-800/50 group flex-1 min-h-[280px] lg:min-h-[500px] touch-none"
      >
        <img
          ref={imageRef}
          src={imageData.dataUrl}
          alt={`${id} workspace`}
          className="absolute top-0 left-0 select-none"
          style={{ maxWidth: 'none', maxHeight: 'none' }}
          draggable={false}
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-4 flex justify-between items-end">
            <div className="bg-black/70 backdrop-blur-md rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-xs text-white font-mono border border-white/10">
              {(safeZoom * 100).toFixed(0)}%
            </div>
            <Button
              size="sm"
              variant="flat"
              className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white h-8 lg:h-8 text-xs"
              onPress={() => fileInputRef.current?.click()}
            >
              Change
            </Button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        id={`file-input-change-${id}`}
        name={`${id}ImageChange`}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        aria-label={`Change ${id === 'then' ? 'before' : 'after'} image`}
      />
    </div>
  );
}
