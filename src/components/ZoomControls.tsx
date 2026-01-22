import { Button } from '@heroui/react';
import { clampZoom } from '@/utils/geometry';

interface Props {
  zoom: number;
  xPos?: number;
  yPos?: number;
  onZoomChange: (zoom: number) => void;
  onReset?: () => void;
  disabled?: boolean;
}

export function ZoomControls({ zoom, xPos = 50, yPos = 50, onZoomChange, onReset, disabled = false }: Props) {
  // Check if image is at default state (zoom = 1.0 and centered position)
  const isAtDefault = zoom === 1.0 && Math.abs(xPos - 50) < 0.1 && Math.abs(yPos - 50) < 0.1;

  const handleZoomIn = () => {
    onZoomChange(clampZoom(zoom + 0.1));
  };

  const handleZoomOut = () => {
    onZoomChange(clampZoom(zoom - 0.1));
  };

  const handleReset = () => {
    if (onReset) {
      onReset(); // Use custom reset function if provided
    } else {
      onZoomChange(1.0); // Fallback to zoom-only reset
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        onPress={handleZoomOut}
        disabled={disabled || zoom <= 1.0}
        className="min-w-0 w-8 h-8 lg:w-8 lg:h-8 p-0 text-lg"
      >
        −
      </Button>
      <span className="text-xs lg:text-xs font-mono w-12 lg:w-12 text-center tabular-nums">
        {(zoom * 100).toFixed(0)}%
      </span>
      <Button
        size="sm"
        onPress={handleZoomIn}
        disabled={disabled || zoom >= 3.0}
        className="min-w-0 w-8 h-8 lg:w-8 lg:h-8 p-0 text-lg"
      >
        +
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onPress={handleReset}
        disabled={disabled || isAtDefault}
        className="min-w-0 px-2.5 h-8 lg:h-8 text-xs lg:text-xs"
      >
        Reset
      </Button>
    </div>
  );
}
