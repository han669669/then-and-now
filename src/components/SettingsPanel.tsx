import { Select, SelectItem } from '@heroui/select';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { motion } from 'framer-motion';
import { SampleImages } from './SampleImages';
import type { Settings, AspectRatio, ArrowStyle, ArrowColor } from '@/types/settings';

interface Props {
  settings: Settings;
  onUpdate: (updates: Partial<Settings>) => void;
  onLoadSamples: () => void;
  showSampleImages: boolean;
}

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: '16:9', label: '16:9 (Widescreen)' },
  { value: '9:16', label: '9:16 (Vertical)' },
  { value: '21:9', label: '21:9 (Ultrawide)' },
  { value: '3:4', label: '3:4 (Standard)' },
  { value: '4:3', label: '4:3 (Standard)' },
];

const arrowStyles: { value: ArrowStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'none', label: 'None' },
];

const arrowColors: { value: ArrowColor; label: string }[] = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
];

export function SettingsPanel({ settings, onUpdate, onLoadSamples, showSampleImages }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 lg:space-y-5"
    >
      <h2 className="text-lg lg:text-2xl font-bold">Settings</h2>

      <form className="space-y-3 lg:space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="aspect-ratio-dropdown" className="block text-sm lg:text-sm font-medium mb-2 text-gray-300">Aspect Ratio</label>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                id="aspect-ratio-dropdown"
                variant="flat"
                className="w-full justify-between bg-gray-800/50 border border-gray-700 hover:bg-gray-800 h-10 text-sm"
                endContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                }
              >
                {aspectRatios.find(r => r.value === settings.aspectRatio)?.label || 'Auto'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Aspect Ratio Selection"
              selectedKeys={[settings.aspectRatio]}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as AspectRatio;
                if (value) {
                  onUpdate({ aspectRatio: value });
                }
              }}
            >
              {aspectRatios.map((ratio) => (
                <DropdownItem key={ratio.value}>
                  {ratio.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div>
          <label htmlFor="then-label-input" className="block text-sm lg:text-sm font-medium mb-2 text-gray-300">"Before" Label</label>
          <Input
            id="then-label-input"
            name="thenLabel"
            size="sm"
            value={settings.thenLabel}
            onChange={(e) => onUpdate({ thenLabel: e.target.value })}
            placeholder="Before"
            classNames={{
              input: "bg-gray-800/50 text-sm",
              inputWrapper: "bg-gray-800/50 border-gray-700 hover:bg-gray-800 h-10",
            }}
          />
        </div>

        <div>
          <label htmlFor="now-label-input" className="block text-sm lg:text-sm font-medium mb-2 text-gray-300">"After" Label</label>
          <Input
            id="now-label-input"
            name="nowLabel"
            size="sm"
            value={settings.nowLabel}
            onChange={(e) => onUpdate({ nowLabel: e.target.value })}
            placeholder="After"
            classNames={{
              input: "bg-gray-800/50 text-sm",
              inputWrapper: "bg-gray-800/50 border-gray-700 hover:bg-gray-800 h-10",
            }}
          />
        </div>

        <div>
          <label htmlFor="arrow-style-select" className="block text-sm lg:text-sm font-medium mb-2 text-gray-300">Arrow Style</label>
          <Select
            id="arrow-style-select"
            name="arrowStyle"
            aria-label="Arrow Style"
            size="sm"
            selectedKeys={[settings.arrowStyle]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as ArrowStyle;
              if (value) { // Only update if a value is selected
                onUpdate({ arrowStyle: value });
              }
            }}
            classNames={{
              trigger: "bg-gray-800/50 border-gray-700 hover:bg-gray-800 h-10",
              value: "text-sm",
            }}
          >
            {arrowStyles.map((style) => (
              <SelectItem key={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <fieldset>
          <legend className="block text-sm lg:text-sm font-medium mb-2 text-gray-300">Arrow Color</legend>
          <div className="flex gap-2" role="radiogroup" aria-labelledby="arrow-color-legend">
            {arrowColors.map((color) => (
              <Button
                key={color.value}
                size="sm"
                color={settings.arrowColor === color.value ? 'primary' : 'default'}
                variant={settings.arrowColor === color.value ? 'solid' : 'bordered'}
                onPress={() => onUpdate({ arrowColor: color.value })}
                className="flex-1 h-10 text-sm"
                role="radio"
                aria-checked={settings.arrowColor === color.value}
                aria-label={`Select ${color.label} arrow color`}
              >
                {color.label}
              </Button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <p className="text-xs text-gray-500 italic text-center lg:text-left">
              Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-300 font-mono text-[10px]">Cmd + X</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-300 font-mono text-[10px]">Ctrl + X</kbd> to preview
            </p>
            
            {/* Sample Images Section - Always visible, but collapsed when images are loaded */}
            <div className="mt-4">
              <SampleImages 
                onLoadSamples={onLoadSamples} 
                isCollapsed={!showSampleImages}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </motion.div>
  );
}
