# Feature: Complete Then & Now Implementation

The following plan implements the entire Then & Now application according to the PRD. This is a comprehensive 4-phase implementation covering project setup, core features, visual customization, and export functionality.

## Feature Description

Then & Now is a browser-based utility for creating professional "Before & After" comparison images. Users upload two images, interactively adjust positioning and scale, customize visual elements (aspect ratio, labels, divider arrows), and export high-resolution composite PNG files—all processed client-side for privacy.

## User Story

As a content creator, photographer, or marketer
I want to create professional before/after comparison images quickly
So that I can produce high-quality visual content without complex design software or compromising privacy

## Problem Statement

Creating professional comparison images currently requires:
- Expensive design software (Photoshop) with steep learning curve
- Manual compositing that's time-consuming
- Online tools that upload images to servers (privacy concerns)
- Lack of customization options for branding

## Solution Statement

A browser-based SPA that processes everything client-side using React 19, Canvas API, and localStorage. Users get:
- Intuitive drag-and-drop interface with real-time preview
- Independent zoom/pan controls for precise framing
- Customizable visual elements (aspect ratios, arrows, labels)
- High-resolution PNG export in under 2 minutes
- Complete privacy (no server uploads)

## Feature Metadata

**Feature Type**: New Capability (Complete Application)
**Estimated Complexity**: High
**Primary Systems Affected**: Entire application (greenfield project)
**Dependencies**: 
- Bun 1.3.6
- React 19.2.3
- Vite 7.3.1
- TypeScript 5.9.3
- @heroui/react 2.8.7
- TailwindCSS 3.4.19
- tailwind-variants 3.2.2
- framer-motion 12.28.1

---

## CONTEXT REFERENCES

### Relevant Codebase Files

**Current State**: No implementation exists yet. This is a greenfield project.

**Reference Documents**:
- `PRD.md` - Complete product requirements and technical specifications
- `.kiro/steering/product.md` - Product vision and user journey
- `.kiro/steering/tech.md` - Technical architecture and standards
- `.kiro/steering/structure.md` - Project structure and conventions

### New Files to Create

**Configuration Files**:
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration (strict mode)
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - TailwindCSS theme and dark mode
- `.gitignore` - Ignore node_modules, dist, .env
- `bun.lockb` - Dependency lock file (auto-generated)

**Source Files** (src/):
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Main application component
- `src/vite-env.d.ts` - Vite type declarations

**Components** (src/components/):
- `src/components/ImageUploader.tsx` - Dual image upload with drag-and-drop
- `src/components/Workspace.tsx` - Interactive preview with zoom/pan
- `src/components/SettingsPanel.tsx` - Customization controls
- `src/components/ExportButton.tsx` - Canvas export and download
- `src/components/ui/Button.tsx` - Reusable button component
- `src/components/ui/Input.tsx` - Reusable input component
- `src/components/ui/Select.tsx` - Reusable select component

**Hooks** (src/hooks/):
- `src/hooks/useImageState.ts` - Image state management
- `src/hooks/useLocalStorage.ts` - localStorage persistence
- `src/hooks/useCanvasExport.ts` - Canvas compositing and export

**Utilities** (src/utils/):
- `src/utils/canvas.ts` - Canvas processing logic
- `src/utils/geometry.ts` - Zoom/pan calculations
- `src/utils/storage.ts` - localStorage helpers
- `src/utils/validation.ts` - File validation

**Types** (src/types/):
- `src/types/image.ts` - Image state types
- `src/types/settings.ts` - Settings and configuration types

**Styles** (src/styles/):
- `src/styles/index.css` - Global styles and Tailwind imports
- `src/styles/variants.ts` - tailwind-variants definitions

**Assets** (src/assets/):
- `src/assets/sample-before.jpg` - Sample "Then" image
- `src/assets/sample-after.jpg` - Sample "Now" image

**Public**:
- `public/index.html` - HTML entry point (if needed)
- `index.html` - Vite HTML template

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

**Core Technologies**:
- [React 19 Documentation](https://react.dev/reference/react)
  - Hooks API reference
  - Why: Core framework patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
  - Strict mode configuration
  - Why: Type safety requirements
- [Vite Guide](https://vitejs.dev/guide/)
  - Configuration and build optimization
  - Why: Build tool setup

**UI & Styling**:
- [HeroUI Components](https://heroui.com/docs/components/button)
  - Button, Input, Select, Modal components
  - Why: Primary UI component library
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
  - Dark mode configuration
  - Why: Styling framework
- [tailwind-variants](https://www.tailwind-variants.org/docs/introduction)
  - Variant API and composition
  - Why: Type-safe style variants
- [Framer Motion](https://www.framer.com/motion/introduction/)
  - Animation API and gestures
  - Why: Smooth transitions

**Browser APIs**:
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
  - Drawing images and text
  - Why: Core export functionality
- [FileReader API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
  - Reading uploaded files
  - Why: Image upload handling
- [localStorage API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  - Storage limits and best practices
  - Why: State persistence

### Patterns to Follow

**TypeScript Strict Mode**:
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**React Functional Components**:
```typescript
// Use function components with explicit types
interface Props {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export function ImageUploader({ onUpload, disabled = false }: Props) {
  // Component logic
}
```

**Custom Hooks Pattern**:
```typescript
// Extract reusable logic into hooks
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue] as const;
}
```

**tailwind-variants Pattern**:
```typescript
// src/styles/variants.ts
import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'px-4 py-2 rounded-lg font-medium transition-colors',
  variants: {
    variant: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

**Percentage-Based Coordinates**:
```typescript
// Store positions as percentages (0-100)
interface ImagePosition {
  xPos: number; // 0-100 (center of visible area)
  yPos: number; // 0-100 (center of visible area)
  zoom: number; // 1.0-3.0
}

// Calculate pixel offset from percentage
function calculateOffset(
  imageSize: number,
  containerSize: number,
  zoom: number,
  posPercent: number
): number {
  const scaledSize = imageSize * zoom;
  const overflow = scaledSize - containerSize;
  return -(overflow * (posPercent / 100));
}
```

**Cover Fit Logic**:
```typescript
// Calculate scale to fill container while maintaining aspect ratio
function calculateCoverScale(
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
```

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation & Core Upload

Establish project structure, configure build tools, and implement basic image upload with localStorage persistence.

**Tasks:**
- Initialize Bun project with dependencies
- Configure TypeScript, Vite, TailwindCSS
- Set up dark theme with HeroUI
- Create project directory structure
- Implement image upload component
- Add localStorage persistence
- Create basic workspace layout

### Phase 2: Interactive Workspace

Implement zoom, pan, and real-time preview functionality with percentage-based coordinate system.

**Tasks:**
- Create geometry utility functions
- Implement useImageState hook
- Build zoom controls (buttons + mouse wheel)
- Add drag-to-pan functionality
- Implement cover fit logic
- Add real-time preview updates
- Persist zoom/pan state in localStorage

### Phase 3: Visual Customization & Settings

Add aspect ratio selection, editable labels, arrow styles, and sample mode.

**Tasks:**
- Create settings panel component
- Implement aspect ratio selector
- Add editable text labels
- Create arrow style selector
- Add color picker
- Implement sample mode
- Add Framer Motion animations

### Phase 4: Canvas Export & Polish

Implement high-resolution canvas export, arrow rendering, and final UX polish.

**Tasks:**
- Create canvas compositing engine
- Implement precise source cropping
- Render divider arrows (3 styles)
- Render labels with high-contrast stroke
- Add PNG export functionality
- Implement keyboard shortcuts
- Add error handling and validation
- Optimize performance
- Cross-browser testing

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.


### PHASE 1: FOUNDATION & CORE UPLOAD

### Task 1.1: CREATE package.json

- **IMPLEMENT**: Initialize Bun project with all required dependencies
- **DEPENDENCIES**: 
  - react@19.2.3, react-dom@19.2.3
  - @heroui/react@2.8.7
  - tailwindcss@3.4.19
  - tailwind-variants@3.2.2
  - framer-motion@12.28.1
  - react-router-dom@7.12.0
- **DEV DEPENDENCIES**:
  - vite@7.3.1
  - typescript@5.9.3
  - @types/react@^19.0.0
  - @types/react-dom@^19.0.0
  - @vitejs/plugin-react@^4.3.4
  - autoprefixer@^10.4.20
  - postcss@^8.4.49
- **SCRIPTS**:
  ```json
  {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  }
  ```
- **VALIDATE**: `bun install && bun run lint`

### Task 1.2: CREATE tsconfig.json

- **IMPLEMENT**: TypeScript configuration with strict mode
- **PATTERN**: Strict type checking, React JSX support
- **CONFIG**:
  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.3: CREATE tsconfig.node.json

- **IMPLEMENT**: TypeScript config for Vite config files
- **CONFIG**:
  ```json
  {
    "compilerOptions": {
      "composite": true,
      "skipLibCheck": true,
      "module": "ESNext",
      "moduleResolution": "bundler",
      "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.ts"]
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.4: CREATE vite.config.ts

- **IMPLEMENT**: Vite configuration with React plugin and path aliases
- **IMPORTS**: `import { defineConfig } from 'vite'`, `import react from '@vitejs/plugin-react'`, `import path from 'path'`
- **CONFIG**:
  ```typescript
  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
  ```
- **VALIDATE**: `bun run dev` (should start without errors)

### Task 1.5: CREATE tailwind.config.js

- **IMPLEMENT**: TailwindCSS configuration with dark mode and HeroUI
- **PATTERN**: Dark mode default, HeroUI plugin integration
- **CONFIG**:
  ```javascript
  const { heroui } = require("@heroui/react");

  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    darkMode: "class",
    plugins: [heroui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "#0a0a0a",
            foreground: "#ffffff",
          },
        },
      },
    })],
  }
  ```
- **VALIDATE**: Build should recognize Tailwind classes

### Task 1.6: CREATE postcss.config.js

- **IMPLEMENT**: PostCSS configuration for TailwindCSS
- **CONFIG**:
  ```javascript
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```
- **VALIDATE**: No PostCSS errors during build

### Task 1.7: CREATE .gitignore

- **IMPLEMENT**: Ignore build artifacts and dependencies
- **CONTENT**:
  ```
  # Dependencies
  node_modules
  .pnp
  .pnp.js

  # Build output
  dist
  dist-ssr
  *.local

  # Environment
  .env
  .env.local
  .env.production

  # Editor
  .vscode/*
  !.vscode/extensions.json
  .idea
  *.swp
  *.swo
  *~

  # OS
  .DS_Store
  Thumbs.db

  # Logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  ```
- **VALIDATE**: `git status` should not show ignored files

### Task 1.8: CREATE index.html

- **IMPLEMENT**: HTML entry point for Vite
- **CONTENT**:
  ```html
  <!doctype html>
  <html lang="en" class="dark">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Then & Now - Before & After Comparison Tool</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  ```
- **VALIDATE**: File exists and has correct structure

### Task 1.9: CREATE src/vite-env.d.ts

- **IMPLEMENT**: Vite type declarations
- **CONTENT**:
  ```typescript
  /// <reference types="vite/client" />
  ```
- **VALIDATE**: TypeScript recognizes Vite types

### Task 1.10: CREATE src/styles/index.css

- **IMPLEMENT**: Global styles with Tailwind imports
- **CONTENT**:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    body {
      @apply bg-background text-foreground;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    #root {
      @apply min-h-screen;
    }
  }
  ```
- **VALIDATE**: Styles load without errors

### Task 1.11: CREATE src/types/image.ts

- **IMPLEMENT**: Type definitions for image state
- **TYPES**:
  ```typescript
  export interface ImageData {
    id: 'then' | 'now';
    file: File | null;
    dataUrl: string | null;
    xPos: number; // 0-100 percentage
    yPos: number; // 0-100 percentage
    zoom: number; // 1.0-3.0
  }

  export interface ImageDimensions {
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
  }

  export interface ImageState {
    then: ImageData;
    now: ImageData;
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.12: CREATE src/types/settings.ts

- **IMPLEMENT**: Type definitions for settings and configuration
- **TYPES**:
  ```typescript
  export type AspectRatio = '16:9' | '9:16' | '21:9' | '3:4' | '4:3' | 'auto';
  export type ArrowStyle = 'modern' | 'classic' | 'minimal';
  export type ArrowColor = 'white' | 'black' | 'red';

  export interface Settings {
    aspectRatio: AspectRatio;
    thenLabel: string;
    nowLabel: string;
    arrowStyle: ArrowStyle;
    arrowColor: ArrowColor;
  }

  export interface AspectRatioValue {
    width: number;
    height: number;
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.13: CREATE src/styles/variants.ts

- **IMPLEMENT**: tailwind-variants definitions for reusable styles
- **IMPORTS**: `import { tv } from 'tailwind-variants'`
- **VARIANTS**:
  ```typescript
  export const button = tv({
    base: 'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        ghost: 'bg-transparent hover:bg-gray-800 text-gray-300',
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  });

  export const input = tv({
    base: 'px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500',
  });

  export const panel = tv({
    base: 'bg-gray-900 border border-gray-800 rounded-lg p-4',
  });
  ```
- **VALIDATE**: `bun run lint`

### Task 1.14: CREATE src/utils/validation.ts

- **IMPLEMENT**: File validation utilities
- **FUNCTIONS**:
  ```typescript
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  export function validateImageFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.',
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: 'File too large. Maximum size is 10MB.',
      };
    }

    return { valid: true };
  }

  export function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.15: CREATE src/utils/storage.ts

- **IMPLEMENT**: localStorage helper utilities
- **FUNCTIONS**:
  ```typescript
  export function saveToLocalStorage<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded');
        // Clear old data or notify user
      }
      throw error;
    }
  }

  export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  }

  export function removeFromLocalStorage(key: string): void {
    window.localStorage.removeItem(key);
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.16: CREATE src/hooks/useLocalStorage.ts

- **IMPLEMENT**: Custom hook for localStorage persistence
- **IMPORTS**: `import { useState, useEffect } from 'react'`, `import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/storage'`
- **HOOK**:
  ```typescript
  export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
      return loadFromLocalStorage(key, initialValue);
    });

    useEffect(() => {
      saveToLocalStorage(key, storedValue);
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.17: CREATE src/hooks/useImageState.ts

- **IMPLEMENT**: Custom hook for managing image state
- **IMPORTS**: `import { useState, useCallback } from 'react'`, `import type { ImageData, ImageState } from '@/types/image'`, `import { useLocalStorage } from './useLocalStorage'`
- **HOOK**:
  ```typescript
  const initialImageData: ImageData = {
    id: 'then',
    file: null,
    dataUrl: null,
    xPos: 50,
    yPos: 50,
    zoom: 1.0,
  };

  export function useImageState() {
    const [imageState, setImageState] = useLocalStorage<ImageState>('then-and-now-images', {
      then: { ...initialImageData, id: 'then' },
      now: { ...initialImageData, id: 'now' },
    });

    const updateImage = useCallback((id: 'then' | 'now', updates: Partial<ImageData>) => {
      setImageState(prev => ({
        ...prev,
        [id]: { ...prev[id], ...updates },
      }));
    }, [setImageState]);

    const removeImage = useCallback((id: 'then' | 'now') => {
      setImageState(prev => ({
        ...prev,
        [id]: { ...initialImageData, id },
      }));
    }, [setImageState]);

    const loadSampleImages = useCallback(async () => {
      // Will be implemented with sample image loading
      console.log('Sample images not yet implemented');
    }, []);

    return {
      imageState,
      updateImage,
      removeImage,
      loadSampleImages,
    };
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 1.18: CREATE src/components/ImageUploader.tsx

- **IMPLEMENT**: Image upload component with drag-and-drop
- **IMPORTS**: HeroUI Button, React hooks, validation utils
- **COMPONENT**:
  ```typescript
  import { useRef, useState } from 'react';
  import { Button } from '@heroui/react';
  import { validateImageFile, readFileAsDataURL } from '@/utils/validation';
  import type { ImageData } from '@/types/image';

  interface Props {
    id: 'then' | 'now';
    imageData: ImageData;
    onUpload: (id: 'then' | 'now', updates: Partial<ImageData>) => void;
    onRemove: (id: 'then' | 'now') => void;
  }

  export function ImageUploader({ id, imageData, onUpload, onRemove }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = async (file: File) => {
      setError(null);
      const validation = validateImageFile(file);
      
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      try {
        const dataUrl = await readFileAsDataURL(file);
        onUpload(id, { file, dataUrl });
      } catch (err) {
        setError('Failed to read file');
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    };

    return (
      <div className="flex flex-col gap-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {imageData.dataUrl ? (
            <div className="space-y-4">
              <img
                src={imageData.dataUrl}
                alt={`${id} preview`}
                className="max-h-40 mx-auto rounded"
              />
              <div className="flex gap-2 justify-center">
                <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                  Replace
                </Button>
                <Button size="sm" color="danger" onClick={() => onRemove(id)}>
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400">
                Drag & drop {id === 'then' ? '"Then"' : '"Now"'} image here
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
  ```
- **VALIDATE**: Component renders without errors

### Task 1.19: CREATE src/App.tsx

- **IMPLEMENT**: Main application component with basic layout
- **IMPORTS**: HeroUI Provider, ImageUploader, hooks
- **COMPONENT**:
  ```typescript
  import { HeroUIProvider } from '@heroui/react';
  import { ImageUploader } from './components/ImageUploader';
  import { useImageState } from './hooks/useImageState';

  export function App() {
    const { imageState, updateImage, removeImage, loadSampleImages } = useImageState();

    return (
      <HeroUIProvider>
        <div className="min-h-screen bg-background text-foreground p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Then & Now</h1>
              <p className="text-gray-400">Create professional before & after comparison images</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUploader
                id="then"
                imageData={imageState.then}
                onUpload={updateImage}
                onRemove={removeImage}
              />
              <ImageUploader
                id="now"
                imageData={imageState.now}
                onUpload={updateImage}
                onRemove={removeImage}
              />
            </div>
          </div>
        </div>
      </HeroUIProvider>
    );
  }
  ```
- **VALIDATE**: App renders with upload components

### Task 1.20: CREATE src/main.tsx

- **IMPLEMENT**: Application entry point
- **IMPORTS**: React, ReactDOM, App, styles
- **CONTENT**:
  ```typescript
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { App } from './App';
  import './styles/index.css';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  ```
- **VALIDATE**: `bun run dev` - App loads in browser

### Task 1.21: VALIDATE Phase 1 Complete

- **RUN**: `bun run dev`
- **TEST**: 
  - App loads with dark theme
  - Can upload "Then" image via drag-and-drop
  - Can upload "Now" image via file picker
  - Images display in preview
  - Can remove uploaded images
  - Refresh browser - images persist
- **VALIDATE**: All Phase 1 acceptance criteria met


### PHASE 2: INTERACTIVE WORKSPACE

### Task 2.1: CREATE src/utils/geometry.ts

- **IMPLEMENT**: Geometry calculations for zoom/pan
- **FUNCTIONS**:
  ```typescript
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
    zoom: number,
    posPercent: number
  ): number {
    const scaledSize = imageSize * zoom;
    const overflow = scaledSize - containerSize;
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
    
    const translateX = calculateOffset(scaledWidth, containerWidth, 1, xPos);
    const translateY = calculateOffset(scaledHeight, containerHeight, 1, yPos);
    
    return { scale, translateX, translateY };
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 2.2: CREATE src/components/ZoomControls.tsx

- **IMPLEMENT**: Zoom control buttons
- **IMPORTS**: HeroUI Button, geometry utils
- **COMPONENT**:
  ```typescript
  import { Button } from '@heroui/react';
  import { clampZoom } from '@/utils/geometry';

  interface Props {
    zoom: number;
    onZoomChange: (zoom: number) => void;
    disabled?: boolean;
  }

  export function ZoomControls({ zoom, onZoomChange, disabled = false }: Props) {
    const handleZoomIn = () => {
      onZoomChange(clampZoom(zoom + 0.1));
    };

    const handleZoomOut = () => {
      onZoomChange(clampZoom(zoom - 0.1));
    };

    const handleReset = () => {
      onZoomChange(1.0);
    };

    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleZoomOut}
          disabled={disabled || zoom <= 1.0}
        >
          −
        </Button>
        <span className="text-sm font-mono w-16 text-center">
          {(zoom * 100).toFixed(0)}%
        </span>
        <Button
          size="sm"
          onClick={handleZoomIn}
          disabled={disabled || zoom >= 3.0}
        >
          +
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleReset}
          disabled={disabled || zoom === 1.0}
        >
          Reset
        </Button>
      </div>
    );
  }
  ```
- **VALIDATE**: Component renders and buttons work

### Task 2.3: CREATE src/components/ImageWorkspace.tsx

- **IMPLEMENT**: Interactive workspace with drag-to-pan and zoom
- **IMPORTS**: React hooks, geometry utils, ZoomControls
- **COMPONENT**:
  ```typescript
  import { useRef, useState, useEffect } from 'react';
  import { ZoomControls } from './ZoomControls';
  import { calculateTransform, clampPosition } from '@/utils/geometry';
  import type { ImageData } from '@/types/image';

  interface Props {
    id: 'then' | 'now';
    imageData: ImageData;
    onUpdate: (id: 'then' | 'now', updates: Partial<ImageData>) => void;
  }

  export function ImageWorkspace({ id, imageData, onUpdate }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const updateDimensions = () => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          setDimensions({ width, height });
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (!imageData.dataUrl) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !imageRef.current) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const { naturalWidth, naturalHeight } = imageRef.current;
      const { scale } = calculateTransform(
        naturalWidth,
        naturalHeight,
        dimensions.width,
        dimensions.height,
        imageData.xPos,
        imageData.yPos,
        imageData.zoom
      );

      const scaledWidth = naturalWidth * scale;
      const scaledHeight = naturalHeight * scale;

      const overflowX = scaledWidth - dimensions.width;
      const overflowY = scaledHeight - dimensions.height;

      const deltaXPercent = overflowX > 0 ? (deltaX / overflowX) * 100 : 0;
      const deltaYPercent = overflowY > 0 ? (deltaY / overflowY) * 100 : 0;

      onUpdate(id, {
        xPos: clampPosition(imageData.xPos - deltaXPercent),
        yPos: clampPosition(imageData.yPos - deltaYPercent),
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.max(1.0, Math.min(3.0, imageData.zoom + delta));
      onUpdate(id, { zoom: newZoom });
    };

    const transform = imageRef.current
      ? calculateTransform(
          imageRef.current.naturalWidth,
          imageRef.current.naturalHeight,
          dimensions.width,
          dimensions.height,
          imageData.xPos,
          imageData.yPos,
          imageData.zoom
        )
      : null;

    if (!imageData.dataUrl) {
      return (
        <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-500">
          No image uploaded
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold capitalize">{id}</h3>
          <ZoomControls
            zoom={imageData.zoom}
            onZoomChange={(zoom) => onUpdate(id, { zoom })}
          />
        </div>

        <div
          ref={containerRef}
          className={`relative bg-gray-900 rounded-lg overflow-hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ height: '400px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <img
            ref={imageRef}
            src={imageData.dataUrl}
            alt={`${id} workspace`}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none select-none"
            style={
              transform
                ? {
                    transform: `scale(${transform.scale}) translate(${transform.translateX / transform.scale}px, ${transform.translateY / transform.scale}px)`,
                    transformOrigin: 'top left',
                  }
                : undefined
            }
            draggable={false}
          />
        </div>

        <div className="text-xs text-gray-500 font-mono">
          Position: {imageData.xPos.toFixed(0)}%, {imageData.yPos.toFixed(0)}% | Zoom: {(imageData.zoom * 100).toFixed(0)}%
        </div>
      </div>
    );
  }
  ```
- **VALIDATE**: Workspace renders with zoom/pan controls

### Task 2.4: UPDATE src/App.tsx

- **IMPLEMENT**: Add ImageWorkspace components to layout
- **IMPORTS**: Add ImageWorkspace import
- **UPDATE**: Replace ImageUploader grid with workspace layout
- **PATTERN**:
  ```typescript
  // Add after header
  <div className="mb-8">
    <Button onClick={loadSampleImages}>Load Sample Images</Button>
  </div>

  {/* Upload section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <ImageUploader ... />
    <ImageUploader ... />
  </div>

  {/* Workspace section */}
  {(imageState.then.dataUrl || imageState.now.dataUrl) && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <ImageWorkspace
        id="then"
        imageData={imageState.then}
        onUpdate={updateImage}
      />
      <ImageWorkspace
        id="now"
        imageData={imageState.now}
        onUpdate={updateImage}
      />
    </div>
  )}
  ```
- **VALIDATE**: Workspaces appear after images uploaded

### Task 2.5: ADD sample images

- **CREATE**: `src/assets/sample-before.jpg` and `src/assets/sample-after.jpg`
- **IMPLEMENT**: Use placeholder images or download sample images
- **NOTE**: For development, can use any two images (e.g., 800x600 JPEGs)
- **VALIDATE**: Files exist in assets folder

### Task 2.6: UPDATE src/hooks/useImageState.ts

- **IMPLEMENT**: Add sample image loading functionality
- **IMPORTS**: Add sample image imports
- **UPDATE**: Implement loadSampleImages function
- **PATTERN**:
  ```typescript
  import sampleBefore from '@/assets/sample-before.jpg';
  import sampleAfter from '@/assets/sample-after.jpg';

  // Inside useImageState hook
  const loadSampleImages = useCallback(async () => {
    try {
      // Fetch and convert to File objects
      const [beforeBlob, afterBlob] = await Promise.all([
        fetch(sampleBefore).then(r => r.blob()),
        fetch(sampleAfter).then(r => r.blob()),
      ]);

      const beforeFile = new File([beforeBlob], 'sample-before.jpg', { type: 'image/jpeg' });
      const afterFile = new File([afterBlob], 'sample-after.jpg', { type: 'image/jpeg' });

      const [beforeDataUrl, afterDataUrl] = await Promise.all([
        readFileAsDataURL(beforeFile),
        readFileAsDataURL(afterFile),
      ]);

      setImageState({
        then: {
          id: 'then',
          file: beforeFile,
          dataUrl: beforeDataUrl,
          xPos: 50,
          yPos: 50,
          zoom: 1.0,
        },
        now: {
          id: 'now',
          file: afterFile,
          dataUrl: afterDataUrl,
          xPos: 50,
          yPos: 50,
          zoom: 1.0,
        },
      });
    } catch (error) {
      console.error('Failed to load sample images:', error);
    }
  }, [setImageState]);
  ```
- **VALIDATE**: Sample images load when button clicked

### Task 2.7: VALIDATE Phase 2 Complete

- **RUN**: `bun run dev`
- **TEST**:
  - Upload two images
  - Zoom in/out with buttons (1x-3x range)
  - Zoom with Ctrl+scroll wheel
  - Drag to pan images
  - Position updates in real-time
  - Zoom/pan state persists on refresh
  - Sample images load correctly
  - Interactions feel smooth (60fps)
- **VALIDATE**: All Phase 2 acceptance criteria met


### PHASE 3: VISUAL CUSTOMIZATION & SETTINGS

### Task 3.1: CREATE src/components/SettingsPanel.tsx

- **IMPLEMENT**: Settings panel with all customization options
- **IMPORTS**: HeroUI components, Settings types, Framer Motion
- **COMPONENT**:
  ```typescript
  import { Select, SelectItem, Input, Button } from '@heroui/react';
  import { motion } from 'framer-motion';
  import type { Settings, AspectRatio, ArrowStyle, ArrowColor } from '@/types/settings';

  interface Props {
    settings: Settings;
    onUpdate: (updates: Partial<Settings>) => void;
  }

  const aspectRatios: { value: AspectRatio; label: string }[] = [
    { value: '16:9', label: '16:9 (Widescreen)' },
    { value: '9:16', label: '9:16 (Vertical)' },
    { value: '21:9', label: '21:9 (Ultrawide)' },
    { value: '3:4', label: '3:4 (Standard)' },
    { value: '4:3', label: '4:3 (Standard)' },
    { value: 'auto', label: 'Auto' },
  ];

  const arrowStyles: { value: ArrowStyle; label: string }[] = [
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Classic' },
    { value: 'minimal', label: 'Minimal' },
  ];

  const arrowColors: { value: ArrowColor; label: string }[] = [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'red', label: 'Red' },
  ];

  export function SettingsPanel({ settings, onUpdate }: Props) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold">Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
            <Select
              selectedKeys={[settings.aspectRatio]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as AspectRatio;
                onUpdate({ aspectRatio: value });
              }}
            >
              {aspectRatios.map((ratio) => (
                <SelectItem key={ratio.value} value={ratio.value}>
                  {ratio.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">"Then" Label</label>
            <Input
              value={settings.thenLabel}
              onChange={(e) => onUpdate({ thenLabel: e.target.value })}
              placeholder="Then"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">"Now" Label</label>
            <Input
              value={settings.nowLabel}
              onChange={(e) => onUpdate({ nowLabel: e.target.value })}
              placeholder="Now"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Arrow Style</label>
            <Select
              selectedKeys={[settings.arrowStyle]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as ArrowStyle;
                onUpdate({ arrowStyle: value });
              }}
            >
              {arrowStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Arrow Color</label>
            <div className="flex gap-2">
              {arrowColors.map((color) => (
                <Button
                  key={color.value}
                  size="sm"
                  variant={settings.arrowColor === color.value ? 'primary' : 'ghost'}
                  onClick={() => onUpdate({ arrowColor: color.value })}
                >
                  {color.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  ```
- **VALIDATE**: Settings panel renders with all controls

### Task 3.2: UPDATE src/App.tsx

- **IMPLEMENT**: Add settings state and SettingsPanel component
- **IMPORTS**: Add SettingsPanel, Settings type, useLocalStorage
- **UPDATE**: Add settings state and panel to layout
- **PATTERN**:
  ```typescript
  import { SettingsPanel } from './components/SettingsPanel';
  import type { Settings } from './types/settings';

  // Inside App component
  const [settings, setSettings] = useLocalStorage<Settings>('then-and-now-settings', {
    aspectRatio: '16:9',
    thenLabel: 'Then',
    nowLabel: 'Now',
    arrowStyle: 'modern',
    arrowColor: 'white',
  });

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Add to layout after workspaces
  <div className="mt-8">
    <SettingsPanel settings={settings} onUpdate={updateSettings} />
  </div>
  ```
- **VALIDATE**: Settings panel appears and updates persist

### Task 3.3: CREATE src/utils/canvas.ts

- **IMPLEMENT**: Canvas utility functions for export
- **FUNCTIONS**:
  ```typescript
  import type { ImageData, Settings, AspectRatioValue } from '@/types';

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
      const maxHeight = Math.max(thenImage.naturalHeight, nowImage.naturalHeight);
      const totalWidth = thenImage.naturalWidth + nowImage.naturalWidth;
      return { width: totalWidth, height: maxHeight };
    }

    const ratio = getAspectRatioValue(aspectRatio);
    if (!ratio) return { width: 1920, height: 1080 };

    const maxHeight = Math.max(thenImage.naturalHeight, nowImage.naturalHeight);
    const width = (maxHeight * ratio.width) / ratio.height;
    return { width, height: maxHeight };
  }

  export interface SourceCropRect {
    sx: number;
    sy: number;
    sWidth: number;
    sHeight: number;
  }

  export function calculateSourceCrop(
    image: HTMLImageElement,
    imageData: ImageData,
    targetWidth: number,
    targetHeight: number
  ): SourceCropRect {
    const { naturalWidth, naturalHeight } = image;
    const { xPos, yPos, zoom } = imageData;

    // Calculate cover scale
    const coverScale = Math.max(
      targetWidth / naturalWidth,
      targetHeight / naturalHeight
    );

    const scale = coverScale * zoom;

    // Calculate visible area dimensions in source image coordinates
    const visibleWidth = targetWidth / scale;
    const visibleHeight = targetHeight / scale;

    // Calculate center point based on position percentages
    const centerX = naturalWidth * (xPos / 100);
    const centerY = naturalHeight * (yPos / 100);

    // Calculate crop rectangle
    const sx = Math.max(0, centerX - visibleWidth / 2);
    const sy = Math.max(0, centerY - visibleHeight / 2);
    const sWidth = Math.min(visibleWidth, naturalWidth - sx);
    const sHeight = Math.min(visibleHeight, naturalHeight - sy);

    return { sx, sy, sWidth, sHeight };
  }

  export function getArrowColor(color: string): string {
    const colors: Record<string, string> = {
      white: '#ffffff',
      black: '#000000',
      red: '#ef4444',
    };
    return colors[color] || '#ffffff';
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 3.4: CREATE src/utils/arrows.ts

- **IMPLEMENT**: Arrow drawing functions for canvas
- **FUNCTIONS**:
  ```typescript
  export function drawModernArrow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
  ) {
    const circleRadius = size * 0.6;
    const arrowSize = size * 0.4;

    // Draw circle background
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw arrow (pointing right)
    ctx.fillStyle = color === '#ffffff' ? '#000000' : '#ffffff';
    ctx.beginPath();
    ctx.moveTo(x - arrowSize / 2, y - arrowSize / 2);
    ctx.lineTo(x + arrowSize / 2, y);
    ctx.lineTo(x - arrowSize / 2, y + arrowSize / 2);
    ctx.closePath();
    ctx.fill();
  }

  export function drawClassicArrow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
  ) {
    const arrowWidth = size * 0.8;
    const arrowHeight = size * 0.6;
    const shaftWidth = arrowHeight * 0.4;

    ctx.fillStyle = color;
    ctx.strokeStyle = color === '#ffffff' ? '#000000' : '#ffffff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    // Arrow shaft
    ctx.moveTo(x - arrowWidth / 2, y - shaftWidth / 2);
    ctx.lineTo(x, y - shaftWidth / 2);
    ctx.lineTo(x, y - arrowHeight / 2);
    // Arrow head
    ctx.lineTo(x + arrowWidth / 2, y);
    ctx.lineTo(x, y + arrowHeight / 2);
    ctx.lineTo(x, y + shaftWidth / 2);
    ctx.lineTo(x - arrowWidth / 2, y + shaftWidth / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  export function drawMinimalArrow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
  ) {
    const chevronSize = size * 0.3;
    const spacing = chevronSize * 0.6;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw three chevrons
    for (let i = 0; i < 3; i++) {
      const offsetX = (i - 1) * spacing;
      ctx.beginPath();
      ctx.moveTo(x + offsetX - chevronSize / 2, y - chevronSize / 2);
      ctx.lineTo(x + offsetX, y);
      ctx.lineTo(x + offsetX - chevronSize / 2, y + chevronSize / 2);
      ctx.stroke();
    }
  }

  export function drawArrow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    style: string,
    color: string
  ) {
    switch (style) {
      case 'modern':
        drawModernArrow(ctx, x, y, size, color);
        break;
      case 'classic':
        drawClassicArrow(ctx, x, y, size, color);
        break;
      case 'minimal':
        drawMinimalArrow(ctx, x, y, size, color);
        break;
    }
  }
  ```
- **VALIDATE**: `bun run lint`

### Task 3.5: VALIDATE Phase 3 Complete

- **RUN**: `bun run dev`
- **TEST**:
  - Settings panel appears
  - Can change aspect ratio
  - Can edit "Then" and "Now" labels
  - Can select arrow style (Modern/Classic/Minimal)
  - Can change arrow color (White/Black/Red)
  - All settings persist on refresh
  - Settings panel has smooth animations
- **VALIDATE**: All Phase 3 acceptance criteria met


### PHASE 4: CANVAS EXPORT & POLISH

### Task 4.1: CREATE src/hooks/useCanvasExport.ts

- **IMPLEMENT**: Custom hook for canvas export functionality
- **IMPORTS**: Canvas utils, arrow utils, Settings types
- **HOOK**:
  ```typescript
  import { useCallback } from 'react';
  import type { ImageState, Settings } from '@/types';
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

        // Calculate half width for split
        const halfWidth = width / 2;

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

        // Draw labels
        const fontSize = Math.max(24, height * 0.05);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const labelPadding = fontSize * 0.5;
        const strokeWidth = fontSize * 0.1;

        // Draw "Then" label
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(settings.thenLabel, halfWidth / 2, labelPadding);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(settings.thenLabel, halfWidth / 2, labelPadding);

        // Draw "Now" label
        ctx.strokeText(settings.nowLabel, halfWidth + halfWidth / 2, labelPadding);
        ctx.fillText(settings.nowLabel, halfWidth + halfWidth / 2, labelPadding);

        // Draw divider arrow
        const arrowSize = height * 0.15;
        const arrowColor = getArrowColor(settings.arrowColor);
        drawArrow(
          ctx,
          halfWidth,
          height / 2,
          arrowSize,
          settings.arrowStyle,
          arrowColor
        );

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
  ```
- **VALIDATE**: `bun run lint`

### Task 4.2: CREATE src/components/ExportButton.tsx

- **IMPLEMENT**: Export button component with loading state
- **IMPORTS**: HeroUI Button, useCanvasExport hook
- **COMPONENT**:
  ```typescript
  import { useState } from 'react';
  import { Button } from '@heroui/react';
  import { useCanvasExport } from '@/hooks/useCanvasExport';
  import type { ImageState, Settings } from '@/types';

  interface Props {
    imageState: ImageState;
    settings: Settings;
    disabled?: boolean;
  }

  export function ExportButton({ imageState, settings, disabled = false }: Props) {
    const { exportImage } = useCanvasExport();
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleExport = async () => {
      setIsExporting(true);
      setError(null);

      try {
        await exportImage(imageState, settings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Export failed');
      } finally {
        setIsExporting(false);
      }
    };

    const canExport = imageState.then.dataUrl && imageState.now.dataUrl;

    return (
      <div className="space-y-2">
        <Button
          size="lg"
          color="primary"
          onClick={handleExport}
          disabled={disabled || !canExport || isExporting}
          className="w-full"
        >
          {isExporting ? 'Exporting...' : 'Export Comparison'}
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!canExport && (
          <p className="text-gray-500 text-sm">Upload both images to export</p>
        )}
      </div>
    );
  }
  ```
- **VALIDATE**: Component renders with proper states

### Task 4.3: UPDATE src/App.tsx

- **IMPLEMENT**: Add ExportButton to layout
- **IMPORTS**: Add ExportButton import
- **UPDATE**: Add export button to settings panel area
- **PATTERN**:
  ```typescript
  import { ExportButton } from './components/ExportButton';

  // Add after SettingsPanel
  <div className="mt-8">
    <ExportButton imageState={imageState} settings={settings} />
  </div>
  ```
- **VALIDATE**: Export button appears and is functional

### Task 4.4: ADD keyboard shortcuts

- **IMPLEMENT**: Keyboard shortcut handling in App.tsx
- **PATTERN**:
  ```typescript
  import { useEffect } from 'react';

  // Inside App component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to export
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (imageState.then.dataUrl && imageState.now.dataUrl) {
          // Trigger export
          const exportBtn = document.querySelector('[data-export-btn]') as HTMLButtonElement;
          exportBtn?.click();
        }
      }

      // Escape to clear focus
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageState]);

  // Add data attribute to ExportButton
  <ExportButton ... data-export-btn />
  ```
- **VALIDATE**: Cmd/Ctrl+Enter triggers export

### Task 4.5: ADD error handling and validation

- **IMPLEMENT**: Comprehensive error handling throughout app
- **UPDATE**: Add try-catch blocks in critical functions
- **PATTERN**:
  ```typescript
  // In ImageUploader
  const handleFile = async (file: File) => {
    try {
      // ... existing code
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Image upload error:', err);
    }
  };

  // In useImageState
  const loadSampleImages = useCallback(async () => {
    try {
      // ... existing code
    } catch (error) {
      console.error('Failed to load sample images:', error);
      alert('Failed to load sample images. Please upload your own.');
    }
  }, [setImageState]);
  ```
- **VALIDATE**: Errors are caught and displayed gracefully

### Task 4.6: ADD performance optimizations

- **IMPLEMENT**: Memoization for expensive calculations
- **UPDATE**: Add useMemo and useCallback where appropriate
- **PATTERN**:
  ```typescript
  import { useMemo, useCallback } from 'react';

  // In ImageWorkspace
  const transform = useMemo(() => {
    if (!imageRef.current) return null;
    return calculateTransform(
      imageRef.current.naturalWidth,
      imageRef.current.naturalHeight,
      dimensions.width,
      dimensions.height,
      imageData.xPos,
      imageData.yPos,
      imageData.zoom
    );
  }, [imageData.xPos, imageData.yPos, imageData.zoom, dimensions]);

  // Debounce localStorage updates
  const debouncedUpdate = useMemo(
    () => debounce((updates: Partial<ImageData>) => {
      onUpdate(id, updates);
    }, 100),
    [id, onUpdate]
  );
  ```
- **VALIDATE**: App feels responsive, no lag during interactions

### Task 4.7: ADD responsive design improvements

- **IMPLEMENT**: Mobile-friendly layout adjustments
- **UPDATE**: Add responsive classes to layout
- **PATTERN**:
  ```typescript
  // In App.tsx
  <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
    <div className="max-w-7xl mx-auto">
      {/* ... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Upload/Workspace components */}
      </div>
    </div>
  </div>

  // In ImageWorkspace
  <div style={{ height: '300px' }} className="md:h-[400px]">
    {/* ... */}
  </div>
  ```
- **VALIDATE**: App works well on mobile and desktop

### Task 4.8: ADD loading states and feedback

- **IMPLEMENT**: Loading indicators for async operations
- **UPDATE**: Add loading states to components
- **PATTERN**:
  ```typescript
  // In ImageUploader
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    try {
      // ... existing code
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner
  {isLoading && <div className="text-center">Loading...</div>}
  ```
- **VALIDATE**: Users see feedback during operations

### Task 4.9: CREATE README.md

- **IMPLEMENT**: Update README with project-specific content
- **CONTENT**: Follow hackathon template structure
- **SECTIONS**:
  - Project description and value proposition
  - Prerequisites (Bun 1.3.6, modern browser)
  - Setup instructions
  - Architecture overview
  - Usage examples
  - Troubleshooting
- **VALIDATE**: README is clear and complete

### Task 4.10: CREATE DEVLOG.md

- **IMPLEMENT**: Create development log
- **CONTENT**: Follow hackathon template structure
- **SECTIONS**:
  - Project overview
  - Development timeline (4 phases)
  - Technical decisions and rationale
  - Challenges and solutions
  - Time tracking
  - Kiro CLI usage statistics
- **VALIDATE**: DEVLOG documents the development process

### Task 4.11: Cross-browser testing

- **TEST**: Verify functionality across browsers
- **BROWSERS**: Chrome, Firefox, Safari, Edge
- **CHECKLIST**:
  - Image upload works
  - Zoom/pan interactions smooth
  - Canvas export generates correct images
  - localStorage persistence works
  - Dark theme renders correctly
  - Keyboard shortcuts work
- **VALIDATE**: All features work across browsers

### Task 4.12: VALIDATE Phase 4 Complete

- **RUN**: `bun run dev`
- **TEST**:
  - Upload two images
  - Adjust zoom/pan for both
  - Customize settings (aspect ratio, labels, arrow)
  - Export comparison image
  - Verify exported PNG quality
  - Test keyboard shortcuts (Cmd/Ctrl+Enter)
  - Refresh browser - state persists
  - Test on mobile device
  - Verify error handling
  - Check performance (smooth 60fps)
- **VALIDATE**: All Phase 4 acceptance criteria met

---

## TESTING STRATEGY

### Unit Tests (Optional for MVP)

**Framework**: Vitest

**Test Coverage**:
- `utils/geometry.ts`: Test all calculation functions
- `utils/canvas.ts`: Test dimension and crop calculations
- `utils/validation.ts`: Test file validation logic
- `utils/storage.ts`: Test localStorage helpers

**Example Test**:
```typescript
import { describe, it, expect } from 'vitest';
import { calculateCoverScale, clampZoom } from '@/utils/geometry';

describe('geometry utils', () => {
  it('calculates cover scale correctly', () => {
    const scale = calculateCoverScale(800, 600, 400, 400);
    expect(scale).toBeCloseTo(0.667);
  });

  it('clamps zoom within range', () => {
    expect(clampZoom(0.5)).toBe(1.0);
    expect(clampZoom(5.0)).toBe(3.0);
    expect(clampZoom(2.0)).toBe(2.0);
  });
});
```

### Integration Tests (Optional for MVP)

**Test Scenarios**:
- Complete user flow: upload → adjust → export
- localStorage persistence across sessions
- Error handling for invalid files
- Canvas export with different settings

### Manual Testing (Required)

**Test Cases**:
1. **Image Upload**:
   - Drag-and-drop upload
   - File picker upload
   - Invalid file type rejection
   - Large file handling
   - Sample image loading

2. **Interactive Workspace**:
   - Zoom in/out with buttons
   - Zoom with Ctrl+scroll
   - Drag to pan
   - Position clamping at edges
   - Smooth 60fps interactions

3. **Visual Customization**:
   - Change aspect ratio
   - Edit labels
   - Switch arrow styles
   - Change arrow colors
   - Settings persistence

4. **Export**:
   - Export with default settings
   - Export with custom settings
   - Verify image quality
   - Test different aspect ratios
   - Verify arrow rendering

5. **Persistence**:
   - Upload images, refresh browser
   - Adjust settings, refresh browser
   - Verify all state restored

6. **Error Handling**:
   - Upload invalid file
   - Export without images
   - localStorage quota exceeded
   - Network errors (sample images)

---

## VALIDATION COMMANDS

### Level 1: Syntax & Style

```bash
# TypeScript type checking
bun run lint

# Build check
bun run build
```

### Level 2: Development Server

```bash
# Start dev server
bun run dev

# Verify app loads at http://localhost:5173
```

### Level 3: Production Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview

# Verify production build works
```

### Level 4: Manual Validation

**Complete User Flow**:
1. Open app in browser
2. Upload "Then" image (drag-and-drop)
3. Upload "Now" image (file picker)
4. Adjust zoom/pan for both images
5. Change aspect ratio to 16:9
6. Edit labels to custom text
7. Select arrow style and color
8. Export comparison image
9. Verify exported PNG quality
10. Refresh browser
11. Verify all state persisted

**Cross-Browser Testing**:
- Test in Chrome, Firefox, Safari, Edge
- Verify all features work consistently

**Mobile Testing**:
- Test on mobile device or emulator
- Verify responsive layout
- Test touch interactions

---

## ACCEPTANCE CRITERIA

- [ ] Project scaffolding complete with all dependencies installed
- [ ] TypeScript strict mode enabled and passing
- [ ] Dark theme configured and rendering correctly
- [ ] Image upload works via drag-and-drop and file picker
- [ ] File validation rejects invalid types and oversized files
- [ ] Images persist in localStorage across browser sessions
- [ ] Sample mode loads demonstration images
- [ ] Zoom controls work (buttons and mouse wheel, 1x-3x range)
- [ ] Drag-to-pan functionality works smoothly
- [ ] Percentage-based coordinate system implemented
- [ ] Cover fit logic maintains aspect ratios
- [ ] Real-time preview updates during interactions
- [ ] Zoom/pan state persists in localStorage
- [ ] Settings panel renders with all controls
- [ ] Aspect ratio selector works (6 options)
- [ ] Text labels are editable and persist
- [ ] Arrow style selector works (3 styles)
- [ ] Arrow color selector works (3 colors)
- [ ] Framer Motion animations are smooth
- [ ] Canvas export generates high-resolution PNG
- [ ] Exported image matches preview composition
- [ ] Arrow renders correctly in all 3 styles
- [ ] Labels render with high-contrast stroke
- [ ] Export completes in < 2 seconds
- [ ] Keyboard shortcuts work (Cmd/Ctrl+Enter, Esc)
- [ ] Error handling is comprehensive and user-friendly
- [ ] Performance is smooth (60fps interactions)
- [ ] Responsive design works on mobile and desktop
- [ ] Cross-browser compatibility verified
- [ ] README.md is complete and clear
- [ ] DEVLOG.md documents development process
- [ ] All validation commands pass
- [ ] End-to-end user flow takes < 2 minutes

---

## COMPLETION CHECKLIST

- [ ] All Phase 1 tasks completed and validated
- [ ] All Phase 2 tasks completed and validated
- [ ] All Phase 3 tasks completed and validated
- [ ] All Phase 4 tasks completed and validated
- [ ] TypeScript compilation passes with no errors
- [ ] Development server runs without errors
- [ ] Production build succeeds
- [ ] Manual testing completed across all browsers
- [ ] Mobile testing completed
- [ ] README.md updated with project details
- [ ] DEVLOG.md created with development timeline
- [ ] All acceptance criteria met
- [ ] Code is clean, well-organized, and maintainable
- [ ] Performance meets requirements (60fps, < 2s export)
- [ ] User experience is smooth and intuitive

---

## NOTES

### Design Decisions

**Percentage-Based Coordinates**: Chosen for resolution-independent positioning. Allows zoom/pan state to work across different container sizes and makes localStorage persistence more robust.

**Separation of Preview and Export**: Preview uses CSS transforms for 60fps performance, while export uses Canvas API for high-quality rendering. This prevents performance degradation with large images.

**localStorage for Persistence**: Simple, privacy-focused solution that requires no backend. Handles quota exceeded errors gracefully.

**HeroUI Component Library**: Provides consistent, accessible UI components with dark theme support out of the box. Reduces custom component development time.

**tailwind-variants**: Enables type-safe, reusable style variants that are easier to maintain than inline conditional classes.

### Trade-offs

**No Undo/Redo**: Deferred to post-MVP to reduce complexity. Users can refresh browser to restore last saved state.

**Limited Image Formats**: JPEG, PNG, WebP only. Avoids complexity of handling exotic formats.

**10MB File Size Limit**: Prevents localStorage quota issues and memory exhaustion. Most use cases don't require larger files.

**No Batch Processing**: Single comparison at a time keeps UI simple and focused.

### Future Enhancements

**Phase 5 (Post-MVP)**:
- Undo/redo history
- Rotation controls
- Brightness/contrast adjustments
- Additional export formats (JPEG, WebP)
- Batch processing
- Preset templates
- Tutorial/onboarding flow

**Performance Optimizations**:
- Web Workers for image processing
- IndexedDB for larger storage capacity
- Progressive image loading
- Canvas caching for repeated exports

**User Experience**:
- Keyboard shortcuts customization
- Drag-and-drop reordering
- Copy/paste image support
- Shareable project links

### Implementation Confidence

**Confidence Score**: 9/10

**Rationale**:
- Clear, comprehensive PRD with detailed specifications
- Well-defined tech stack with modern, stable versions
- Proven patterns (React hooks, Canvas API, localStorage)
- Straightforward architecture with no complex dependencies
- Detailed task breakdown with validation at each step

**Risks**:
- Canvas API browser inconsistencies (mitigated by testing)
- localStorage quota limits (mitigated by error handling)
- Performance with very large images (mitigated by file size limits)

**Success Factors**:
- Systematic phase-by-phase implementation
- Validation after each task
- Clear acceptance criteria
- Comprehensive testing strategy
- Focus on core functionality first, polish later
