import { HeroUIProvider } from '@heroui/react';
import { ImageWorkspace } from './components/ImageWorkspace';
import { SettingsPanel } from './components/SettingsPanel';
import { ExportButton } from './components/ExportButton';
import { Logo } from './components/Logo';
import { useImageState } from './hooks/useImageState';
import { useLocalStorage } from './hooks/useLocalStorage';
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

  const handleUpload = (id: 'then' | 'now', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      updateImage(id, { file, dataUrl, xPos: 50, yPos: 50, zoom: 1.0 });
    };
    reader.readAsDataURL(file);
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
      
      // Update both images
      handleUpload('then', beforeFile);
      handleUpload('now', afterFile);
    } catch (error) {
      console.error('Failed to load sample images:', error);
    }
  };

  const hasImages = imageState.then.dataUrl || imageState.now.dataUrl;
  const showSampleImages = !imageState.then.dataUrl && !imageState.now.dataUrl;

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
          <div className="flex-1 p-3 space-y-3 pb-20">
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
        </div>
      </div>
    </HeroUIProvider>
  );
}
