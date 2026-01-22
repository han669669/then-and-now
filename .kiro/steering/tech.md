# Technical Architecture

## Technology Stack

### Core Runtime & Build
- **Runtime**: Bun 1.3.6
- **Build Tool**: Vite 7.3.1
- **Language**: TypeScript 5.9.3

### Frontend Framework
- **Framework**: React 19.2.3
- **Routing**: React-Router-Dom 7.12.0

### UI & Styling
- **UI Framework**: @heroui/react 2.8.7
- **Styling**: TailwindCSS 3.4.19
- **Variants**: tailwind-variants 3.2.2
- **Animation**: framer-motion 12.28.1

### Storage
- **Client-Side**: localStorage for image persistence and state management

## Architecture Overview

### Client-Side Single Page Application
- **Pure Frontend**: No backend server required - all processing happens in the browser
- **Component Structure**:
  - Image upload and management components
  - Interactive workspace with zoom/pan controls
  - Settings panel for customization
  - Canvas-based export engine
- **State Management**: React hooks for local state, localStorage for persistence
- **Rendering Pipeline**: HTML5 Canvas for high-quality image compositing

### Key Components
1. **Image Manager**: Handles upload, storage, and retrieval
2. **Workspace Controller**: Manages zoom, pan, and positioning logic
3. **Canvas Compositor**: Performs high-resolution image stitching
4. **Settings Panel**: Controls aspect ratio, labels, arrow styles
5. **Export Engine**: Generates and downloads final PNG

## Development Environment

### Required Tools
- **Bun 1.3.6**: Primary runtime and package manager
- **Node.js**: Compatible version for tooling (if needed)
- **Modern Browser**: Chrome/Edge/Firefox with Canvas API support

### Setup Instructions
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

### IDE Recommendations
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## Code Standards

### TypeScript
- **Strict Mode**: Enable all strict type checking options
- **Type Safety**: Explicit types for props, state, and function signatures
- **No `any`**: Use proper types or `unknown` with type guards

### React Patterns
- **Functional Components**: Use hooks exclusively
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Component Composition**: Prefer composition over prop drilling
- **Memoization**: Use `useMemo` and `useCallback` for expensive operations

### Styling
- **TailwindCSS**: Utility-first approach
- **tailwind-variants**: Define reusable style variants centrally
- **Dark Theme**: Default to dark mode with proper contrast
- **Responsive**: Mobile-first responsive design

### File Organization
- **Component Files**: One component per file
- **Naming**: PascalCase for components, camelCase for utilities
- **Imports**: Absolute imports from `src/`
- **Types**: Co-locate types with components or in dedicated `types/` folder

## Testing Strategy

### Unit Testing
- **Framework**: Vitest (Vite-native testing)
- **Coverage**: Focus on utility functions and canvas logic
- **Mocking**: Mock localStorage and Canvas APIs

### Integration Testing
- **Component Testing**: Test user interactions and state changes
- **Canvas Testing**: Verify image processing and export quality

### Manual Testing
- **Browser Testing**: Chrome, Firefox, Safari, Edge
- **Image Quality**: Test with various image sizes and aspect ratios
- **Performance**: Monitor memory usage with large images

## Deployment Process

### Static Site Deployment
- **Build Output**: `dist/` folder contains static assets
- **Hosting Options**:
  - Vercel (recommended for Vite projects)
  - Netlify
  - AWS S3 + CloudFront
  - GitHub Pages

### CI/CD Pipeline
```bash
# Build command
bun run build

# Output directory
dist/
```

### Environment Configuration
- **No Environment Variables**: Pure client-side application
- **Build Optimization**: Vite handles code splitting and minification

## Performance Requirements

### Load Time
- **Initial Load**: < 2 seconds on 3G connection
- **Time to Interactive**: < 3 seconds

### Runtime Performance
- **Zoom/Pan**: 60fps smooth animations
- **Export**: < 2 seconds for typical image sizes (< 5MB each)
- **Memory**: Efficient cleanup of canvas and image data

### Optimization Strategies
- **Code Splitting**: Lazy load non-critical components
- **Image Optimization**: Efficient canvas rendering with proper source cropping
- **State Management**: Minimize re-renders with proper memoization
- **localStorage**: Compress or limit stored image data

## Security Considerations

### Client-Side Security
- **No Server Communication**: All processing happens locally
- **Data Privacy**: Images never leave the user's browser
- **localStorage Limits**: Handle quota exceeded errors gracefully
- **XSS Prevention**: Sanitize any user-generated text inputs

### Content Security
- **File Validation**: Verify uploaded files are valid images
- **Size Limits**: Prevent memory exhaustion from oversized images
- **Error Handling**: Graceful degradation for unsupported formats

### Best Practices
- **HTTPS Only**: Serve application over HTTPS in production
- **Content Security Policy**: Implement CSP headers
- **Dependency Audits**: Regular security audits of npm packages
