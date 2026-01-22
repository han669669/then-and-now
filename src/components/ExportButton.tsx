import { useState, useEffect, useRef } from 'react';
import { Button } from '@heroui/react';
import { PreviewModal } from './PreviewModal';
import { useCanvasExport } from '@/hooks/useCanvasExport';
import type { ImageState } from '@/types/image';
import type { Settings } from '@/types/settings';

interface Props {
  imageState: ImageState;
  settings: Settings;
  disabled?: boolean;
  enableKeyboardShortcut?: boolean;
}

export function ExportButton({ imageState, settings, disabled = false, enableKeyboardShortcut = false }: Props) {
  const { exportImage } = useCanvasExport();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  const handlePreview = () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setIsPreviewOpen(true);
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 500);
  };

  const handleExport = async () => {
    setError(null);

    try {
      await exportImage(imageState, settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  };

  const canExport = imageState.then.dataUrl && imageState.now.dataUrl;

  // Keyboard shortcut: Cmd+X or Ctrl+X (only for the designated button)
  useEffect(() => {
    if (!canExport || disabled || !enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        e.stopPropagation();
        handlePreview();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [canExport, disabled, enableKeyboardShortcut]);

  return (
    <>
      <Button
        size="md"
        color="primary"
        onPress={handlePreview}
        disabled={disabled || !canExport}
        className="w-auto lg:w-full font-semibold shadow-lg text-base lg:text-base px-5 lg:px-7 h-10 lg:h-12"
        radius="lg"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Generate
      </Button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageState={imageState}
        settings={settings}
        onExport={handleExport}
      />
    </>
  );
}
