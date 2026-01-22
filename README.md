# Then & Now - Professional Before & After Comparison Tool

🎨 **Create stunning before/after comparison images in under 2 minutes** - A privacy-focused, browser-based tool for content creators, photographers, and marketers.

Then & Now is a **complete, production-ready** client-side web application that enables users to upload two images, interactively adjust their positioning and scale, customize visual elements, and export high-resolution comparison images—all without uploading data to any server.

**✨ Live Demo**: Upload your images or try the sample images to see it in action!

**Key Features:**
- 🖼️ **Dual Image Upload**: Drag-and-drop support with file validation
- 🔍 **Interactive Controls**: Independent zoom (1x-3x) and pan for precise framing
- 🎨 **Flexible Layouts**: 6 aspect ratios (16:9, 9:16, 21:9, 3:4, 4:3, Auto)
- ✏️ **Custom Labels**: Editable "Then" and "Now" text with high-contrast rendering
- ➡️ **Professional Arrows**: Three styles (Modern, Classic, Minimal) with color options
- 💾 **Smart Persistence**: localStorage saves images and settings across sessions
- 🔒 **100% Private**: Client-side processing - your images never leave your browser
- ⚡ **Instant Export**: High-resolution PNG generation in under 2 seconds
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ⌨️ **Keyboard Shortcuts**: Ctrl/Cmd+E for quick export
- 🎭 **Sample Images**: Built-in examples for instant demonstration


## Prerequisites

- **Bun 1.3.6** - JavaScript runtime and package manager
- **Modern Browser** - Chrome, Firefox, Safari, or Edge with Canvas API support
- **Kiro CLI** - For AI-assisted development (optional but recommended)

## Quick Start

### 1. Clone and setup
```bash
git clone https://github.com/yourusername/then-and-now
cd then-and-now
bun install
```

### 2. Run the application
```bash
bun run dev
```

### 3. Access the interface
- Open your browser to **http://localhost:5173**
- Upload two images (drag-and-drop or file picker)
- Adjust positioning with zoom/pan controls
- Customize settings (aspect ratio, labels, arrows)
- Export your comparison image

## Architecture & Codebase Overview

### System Architecture
- **Pure Frontend SPA**: No backend required - all processing happens in the browser
- **Component-Based**: React 19 with TypeScript for type safety
- **Client-Side Processing**: HTML5 Canvas API for high-quality image compositing
- **State Persistence**: localStorage for saving images and settings across sessions

### Technology Stack
- **Runtime**: Bun 1.3.6
- **Framework**: React 19.2.3 with TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **UI Library**: @heroui/react 2.8.7
- **Styling**: TailwindCSS 3.4.19 with tailwind-variants 3.2.2
- **Animation**: framer-motion 12.28.1

### Directory Structure
```
then-and-now/
├── src/
│   ├── components/          # React UI components
│   │   ├── ImageUploader.tsx
│   │   ├── Workspace.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── ExportButton.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useImageState.ts
│   │   ├── useLocalStorage.ts
│   │   └── useCanvasExport.ts
│   ├── utils/               # Utility functions
│   │   ├── canvas.ts        # Canvas processing
│   │   ├── geometry.ts      # Zoom/pan calculations
│   │   └── storage.ts       # localStorage helpers
│   ├── types/               # TypeScript definitions
│   └── styles/              # Global styles
├── .kiro/                   # Kiro CLI configuration
│   ├── steering/            # Project documentation
│   └── prompts/             # Custom development prompts
├── PRD.md                   # Product Requirements Document
└── README.md                # This file
```

### Key Components
- **ImageUploader** (`src/components/ImageUploader.tsx`): Handles dual image upload with drag-and-drop
- **ImageWorkspace** (`src/components/ImageWorkspace.tsx`): Interactive preview with zoom/pan controls
- **SettingsPanel** (`src/components/SettingsPanel.tsx`): Customization controls for aspect ratio, labels, arrows
- **ExportButton** (`src/components/ExportButton.tsx`): Canvas-based high-resolution export
- **PreviewModal** (`src/components/PreviewModal.tsx`): Full-screen preview with real-time composition
- **ZoomControls** (`src/components/ZoomControls.tsx`): Zoom in/out buttons with visual feedback
- **SampleImages** (`src/components/SampleImages.tsx`): Built-in demonstration images
- **Logo** (`src/components/Logo.tsx`): Animated brand logo component
- **useImageState** (`src/hooks/useImageState.ts`): Manages image state with localStorage persistence
- **useCanvasExport** (`src/hooks/useCanvasExport.ts`): Handles canvas compositing and PNG export
- **useLocalStorage** (`src/hooks/useLocalStorage.ts`): Generic localStorage persistence hook

## Deep Dive

### Image Processing Pipeline
1. **Upload**: FileReader API loads images as Base64 data URLs
2. **Preview**: CSS transforms provide smooth 60fps zoom/pan interactions
3. **Positioning**: Percentage-based coordinates (0-100) for resolution independence
4. **Export**: Canvas API composites images with precise source cropping
5. **Download**: Blob API generates and downloads high-quality PNG

### Kiro CLI Integration
This project was developed using Kiro CLI for AI-assisted development:
- **Custom Prompts**: 12 specialized prompts for planning, execution, and documentation
- **Steering Documents**: Comprehensive product, tech, and structure documentation
- **Workflow**: `@prime` → `@plan-feature` → `@execute` → `@code-review` → `@update-docs`

### Performance Optimizations
- **Separation of Concerns**: Preview uses CSS transforms, export uses Canvas
- **Memoization**: React.useMemo for expensive geometry calculations
- **Debouncing**: localStorage updates debounced during drag operations
- **File Size Limits**: 10MB per image to prevent memory issues

## Troubleshooting

### Common Issues

**Images not persisting after refresh**
- Check browser localStorage quota (may be full)
- Try clearing old data: Open DevTools → Application → Local Storage → Clear
- Reduce image file sizes before uploading

**Zoom/pan feels laggy**
- Ensure you're using a modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- Close other tabs to free up memory
- Try smaller image files (< 5MB recommended)

**Export button not working**
- Verify both "Then" and "Now" images are uploaded
- Check browser console for errors (F12 → Console)
- Try refreshing the page and re-uploading images

**Drag-and-drop not working**
- Ensure you're dragging image files (JPEG, PNG, WebP)
- Try using the file picker button instead
- Check that file size is under 10MB

### Getting Help
- Check the [PRD.md](PRD.md) for detailed specifications
- Review [DEVLOG.md](DEVLOG.md) for development decisions
- Open an issue on GitHub with error details

---

## Development

### Building from Source
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Kiro CLI Workflow
```bash
# Load project context
@prime

# Plan a new feature
@plan-feature

# Execute implementation plan
@execute .agents/plans/[plan-name].md

# Review code quality
@code-review

# Update documentation
@update-docs milestone
```

---

**Built with Kiro CLI for the Dynamous Hackathon** 🚀
