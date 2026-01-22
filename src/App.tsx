import { HeroUIProvider } from '@heroui/react';
import { ImageWorkspace } from './components/ImageWorkspace';
import { SettingsPanel } from './components/SettingsPanel';
import { ExportButton } from './components/ExportButton';
import { Logo } from './components/Logo';
import { useImageState } from './hooks/useImageState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { processImageFile } from './utils/imageOptimization';
import type { Settings } from './types/settings';
import sampleBefore from './assets/sample-before.jpg';
import sampleAfter from './assets/sample-after.jpg';

export function App() {
  const { imageState, updateImage, removeImage } = useImageState();
  const [settings, setSettings] = useLocalStorage<Settings>('then-and-now-settings', {
    aspectRatio: 'auto',
    thenLabel: 'Before',
    nowLabel: 'After',
    arrowStyle: 'classic',
    arrowColor: 'white',
  });

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const handleUpload = async (id: 'then' | 'now', file: File, isSample = false) => {
    try {
      // Process image file (includes HEIF conversion and validation)
      const { file: processedFile, dataUrl } = await processImageFile(file);
      
      updateImage(id, { 
        file: processedFile, 
        dataUrl, 
        xPos: 50, 
        yPos: 50, 
        zoom: 1.0 
      }, isSample);

    } catch (error) {
      console.error('Image upload failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image. Please try a different image.');
    }
  };

  const handleLoadSamples = async () => {
    try {
      // Load sample before image
      const beforeResponse = await fetch(sampleBefore);
      const beforeBlob = await beforeResponse.blob();
      const beforeFile = new File([beforeBlob], 'sample-before.jpg', { type: 'image/jpeg' });
      
      // Load sample after image
      const afterResponse = await fetch(sampleAfter);
      const afterBlob = await afterResponse.blob();
      const afterFile = new File([afterBlob], 'sample-after.jpg', { type: 'image/jpeg' });
      
      // Update both images as samples (won't overwrite user images in localStorage)
      await handleUpload('then', beforeFile, true);
      await handleUpload('now', afterFile, true);
    } catch (error) {
      console.error('Failed to load sample images:', error);
      alert('Failed to load sample images. Please try again.');
    }
  };

  const hasImages = imageState.then.dataUrl || imageState.now.dataUrl;
  const showSampleImages = !hasImages; // Show samples when no images are loaded

  return (
    <HeroUIProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-foreground">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col h-screen">
          {/* Elegant Navbar */}
          <header className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/30 px-8 py-5">
            <div className="flex items-center justify-between max-w-[2000px] mx-auto">
              <div className="flex items-center gap-4">
                <Logo size="lg" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Then & Now
                  </h1>
                  <p className="text-gray-500 text-sm mt-0.5">Instantly create stunning before & after visuals</p>
                </div>
              </div>
              {hasImages && (
                <div className="w-full max-w-xs">
                  <ExportButton imageState={imageState} settings={settings} enableKeyboardShortcut={true} />
                </div>
              )}
            </div>
          </header>

          {/* Main Content - Side by Side Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Before */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col">
              <ImageWorkspace
                id="then"
                imageData={imageState.then}
                onUpdate={updateImage}
                onUpload={handleUpload}
                onRemove={removeImage}
              />
            </div>

            {/* Right: After */}
            <div className="flex-1 p-6 overflow-y-auto border-l border-gray-800/50 flex flex-col">
              <ImageWorkspace
                id="now"
                imageData={imageState.now}
                onUpdate={updateImage}
                onUpload={handleUpload}
                onRemove={removeImage}
              />
            </div>

            {/* Far Right: Settings - Compact Fixed Width */}
            <div className="w-72 bg-gray-900/30 backdrop-blur-xl border-l border-gray-800/50 overflow-y-auto">
              <div className="p-6 sticky top-0">
                <SettingsPanel 
                  settings={settings} 
                  onUpdate={updateSettings}
                  onLoadSamples={handleLoadSamples}
                  showSampleImages={showSampleImages}
                />
              </div>
            </div>
          </div>

          {/* Desktop Footer */}
          <footer className="border-t border-gray-800/50 bg-gray-900/20 backdrop-blur-xl px-8 py-3">
            <div className="flex justify-center max-w-[2000px] mx-auto">
              <a 
                href="https://github.com/han669669/then-and-now" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </footer>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col min-h-screen">
          {/* Compact Mobile Header */}
          <header className="sticky top-0 z-50 border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/95 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Then & Now
                  </h1>
                  <p className="text-sm text-gray-500">Before & After</p>
                </div>
              </div>
              {hasImages && (
                <ExportButton imageState={imageState} settings={settings} enableKeyboardShortcut={false} />
              )}
            </div>
          </header>

          {/* Mobile Content */}
          <div className="flex-1 p-3 space-y-3 pb-3">
            <ImageWorkspace
              id="then"
              imageData={imageState.then}
              onUpdate={updateImage}
              onUpload={handleUpload}
              onRemove={removeImage}
            />
            
            <ImageWorkspace
              id="now"
              imageData={imageState.now}
              onUpdate={updateImage}
              onUpload={handleUpload}
              onRemove={removeImage}
            />

            <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-3">
              <SettingsPanel 
                settings={settings} 
                onUpdate={updateSettings}
                onLoadSamples={handleLoadSamples}
                showSampleImages={showSampleImages}
              />
            </div>
          </div>

          {/* Mobile Footer */}
          <footer className="border-t border-gray-800/50 bg-gray-900/95 backdrop-blur-xl px-4 py-3">
            <div className="flex justify-center">
              <a 
                href="https://github.com/han669669/then-and-now" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </footer>
        </div>
      </div>
    </HeroUIProvider>
  );
}
