# Product Requirements Document: **Then & Now**

## 1. Executive Summary

**Then & Now** is a browser-based utility that enables users to create professional-quality "Before & After" comparison images without requiring design software expertise. Users upload two images, interactively adjust their positioning and scale, customize visual elements (aspect ratio, labels, divider arrows), and export a high-resolution composite image—all processed locally in the browser for maximum privacy and speed.

The tool targets content creators, photographers, marketers, and hobbyists who need quick, professional comparison images for social media, portfolios, or marketing materials. By eliminating the need for complex photo editing software and server uploads, Then & Now delivers a streamlined, privacy-focused solution that produces publication-ready results in under 2 minutes.

The MVP focuses on core image manipulation, visual customization, and high-quality export functionality, with all processing happening client-side using modern web technologies (React 19, Canvas API, localStorage persistence).

## 2. Mission

**Mission Statement:**
Democratize professional-quality comparison image creation by providing an intuitive, privacy-focused browser tool that delivers publication-ready results without technical expertise or software installation.

**Core Principles:**
1. **Privacy First**: All image processing happens client-side—user images never leave their browser
2. **Quality Without Compromise**: Output resolution matches or exceeds input quality with professional visual polish
3. **Instant Gratification**: Sub-2-minute workflow from upload to export with real-time preview
4. **Zero Learning Curve**: Intuitive controls that require no tutorials or prior design experience
5. **Performance Conscious**: Smooth 60fps interactions with efficient memory management for large images

## 3. Target Users

### Primary User Personas

**1. Content Creator (Social Media Influencer)**
- **Technical Comfort**: Moderate (comfortable with web apps, not with design software)
- **Needs**: Quick transformation content for Instagram/YouTube, consistent branding, mobile-friendly workflow
- **Pain Points**: Photoshop is too complex and expensive, online tools upload images to servers, existing tools lack customization

**2. Professional Photographer**
- **Technical Comfort**: High (familiar with professional tools but values efficiency)
- **Needs**: Showcase editing skills, portfolio pieces, client presentations with before/after comparisons
- **Pain Points**: Manual compositing is time-consuming, wants high-resolution output, needs precise control over framing

**3. Marketing Professional**
- **Technical Comfort**: Moderate to High
- **Needs**: Product demonstrations, A/B testing visuals, campaign materials with clear comparisons
- **Pain Points**: Needs brand consistency (custom colors/styles), batch processing mindset, quality for print and digital

**4. Hobbyist/DIY User**
- **Technical Comfort**: Low to Moderate
- **Needs**: Home renovation comparisons, personal transformation journeys, simple visual storytelling
- **Pain Points**: Intimidated by professional software, wants free/accessible tools, values simplicity over features

## 4. MVP Scope

### ✅ In Scope: Core Functionality

**Image Management:**
- ✅ Dual image upload (drag-and-drop + file picker)
- ✅ localStorage persistence across browser sessions
- ✅ Sample mode with pre-loaded demonstration images
- ✅ Individual image removal and replacement

**Interactive Workspace:**
- ✅ Independent zoom controls (1x-3x range) via UI buttons and mouse wheel
- ✅ Drag-to-pan positioning with percentage-based coordinates (0-100)
- ✅ "Cover" fit logic maintaining aspect ratios
- ✅ Real-time preview of adjustments

**Visual Customization:**
- ✅ Aspect ratio selection (16:9, 9:16, 21:9, 3:4, 4:3, Auto)
- ✅ Editable "Then" and "Now" text labels
- ✅ Three divider arrow styles (Modern, Classic, Minimal)
- ✅ Three color options (White, Black, Red)

**Export & Processing:**
- ✅ Canvas-based high-resolution compositing
- ✅ One-click PNG export with quality preservation
- ✅ Client-side processing (no server uploads)
- ✅ Efficient source cropping for zoomed/panned views

### ✅ In Scope: Technical

- ✅ React 19.2.3 with TypeScript 5.9.3
- ✅ Bun 1.3.6 runtime and package manager
- ✅ Vite 7.3.1 build tooling
- ✅ @heroui/react 2.8.7 component library
- ✅ framer-motion 12.28.1 for animations
- ✅ tailwind-variants 3.2.2 for style management
- ✅ Dark theme as default
- ✅ Responsive design (mobile-first)

### ❌ Out of Scope: Future Enhancements

**Advanced Features:**
- ❌ Batch processing multiple image pairs
- ❌ Video comparison support
- ❌ Advanced filters or color correction
- ❌ Undo/redo history beyond browser refresh
- ❌ Cloud storage or account system
- ❌ Collaboration or sharing features

**Integration:**
- ❌ Social media direct posting
- ❌ Third-party service integrations
- ❌ API for programmatic access
- ❌ Plugin/extension ecosystem

**Deployment:**
- ❌ Native mobile apps
- ❌ Desktop applications
- ❌ Offline PWA functionality (beyond basic caching)
- ❌ Multi-language support

## 5. User Stories

### Primary User Stories

**US-1: Quick Comparison Creation**
- **Story**: As a content creator, I want to upload two images and create a comparison in under 2 minutes, so that I can quickly produce social media content without learning complex software.
- **Example**: Instagram influencer uploads before/after fitness photos, adjusts framing, selects 9:16 aspect ratio, and exports for Stories—all in 90 seconds.

**US-2: Precise Image Framing**
- **Story**: As a photographer, I want to independently zoom and pan each image, so that I can perfectly frame the comparison to highlight specific details.
- **Example**: Wedding photographer zooms into bride's face in "before" photo and adjusts "after" photo to match composition, ensuring consistent framing.

**US-3: Brand-Consistent Styling**
- **Story**: As a marketer, I want to customize arrow styles and colors, so that comparison images match our brand guidelines.
- **Example**: Marketing team uses red arrows with "minimal" style to match company branding across all product comparison images.

**US-4: Privacy-Focused Processing**
- **Story**: As a professional photographer, I want all image processing to happen locally in my browser, so that client photos never leave my device.
- **Example**: Photographer works with confidential client images, confident that no data is uploaded to external servers.

**US-5: High-Resolution Output**
- **Story**: As a content creator, I want exported images to maintain the quality of my original photos, so that I can use them for print or high-resolution digital displays.
- **Example**: User uploads 4K images and exports a comparison that preserves full resolution for YouTube thumbnail.

**US-6: Persistent Workflow**
- **Story**: As a hobbyist, I want my uploaded images and settings to persist across browser sessions, so that I can return to my work without re-uploading.
- **Example**: User uploads renovation photos, closes browser, returns next day to find images and zoom settings intact.

**US-7: Sample Exploration**
- **Story**: As a new user, I want to load sample images to explore features, so that I can understand the tool's capabilities before uploading my own photos.
- **Example**: First-time visitor clicks "Load Sample" to see a pre-configured comparison and experiment with controls.

**US-8: Flexible Aspect Ratios**
- **Story**: As a multi-platform content creator, I want to select different aspect ratios, so that I can create optimized images for Instagram (9:16), YouTube (16:9), and Twitter (3:4).
- **Example**: Creator exports same comparison in three aspect ratios for cross-platform posting.

## 6. Core Architecture & Patterns

### High-Level Architecture

**Client-Side Single Page Application (SPA)**
- Pure frontend React application with no backend dependencies
- All state management via React hooks and localStorage
- Canvas API for high-performance image compositing
- Component-based architecture with clear separation of concerns

### Directory Structure

```
src/
├── components/          # React UI components
│   ├── ImageUploader.tsx
│   ├── Workspace.tsx
│   ├── SettingsPanel.tsx
│   ├── ExportButton.tsx
│   └── ui/              # Reusable HeroUI-based components
├── hooks/               # Custom React hooks
│   ├── useImageState.ts
│   ├── useLocalStorage.ts
│   └── useCanvasExport.ts
├── utils/               # Pure utility functions
│   ├── canvas.ts        # Canvas processing logic
│   ├── geometry.ts      # Zoom/pan calculations
│   └── storage.ts       # localStorage helpers
├── types/               # TypeScript definitions
│   ├── image.ts
│   └── settings.ts
├── styles/              # Style configurations
│   └── variants.ts      # tailwind-variants definitions
└── assets/              # Static assets (sample images)
```

### Key Design Patterns

**1. Custom Hooks Pattern**
- Extract stateful logic into reusable hooks (`useImageState`, `useLocalStorage`, `useCanvasExport`)
- Separate concerns: UI components focus on rendering, hooks manage state and side effects

**2. Percentage-Based Coordinate System**
- Store image positions as percentages (0-100) rather than pixels
- Enables resolution-independent positioning and responsive design
- Calculate pixel translations at render time based on container dimensions

**3. Cover Fit Logic**
- Implement CSS `object-fit: cover` behavior in Canvas API
- Calculate scale factors to fill container while maintaining aspect ratio
- Crop overflow based on pan position (xPos, yPos percentages)

**4. Separation of Preview and Export**
- Preview workspace uses CSS transforms for smooth 60fps interactions
- Export uses high-resolution Canvas with precise source cropping
- Prevents performance degradation with large images

**5. Variant-Based Styling**
- Centralize style variants using `tailwind-variants`
- Type-safe style composition with TypeScript
- Avoid inline conditional class strings

### React-Specific Patterns

- **Functional Components**: Exclusively use function components with hooks
- **Memoization**: Use `useMemo` for expensive calculations (geometry, canvas operations)
- **Callback Optimization**: Use `useCallback` for event handlers passed to child components
- **Component Composition**: Prefer composition over prop drilling (context where appropriate)

## 7. Core Features

### Feature 1: Image Upload & Management

**Purpose**: Enable users to load, persist, and manage two images for comparison.

**Key Capabilities:**
- Drag-and-drop upload with visual feedback
- File picker fallback for accessibility
- Image validation (file type, size limits)
- localStorage persistence with Base64 encoding
- Sample mode with pre-loaded demonstration images
- Individual image removal and replacement

**Technical Details:**
- Use `FileReader` API for client-side image loading
- Store images as Base64 data URLs in localStorage
- Implement quota exceeded error handling
- Validate MIME types (image/jpeg, image/png, image/webp)
- Suggested size limit: 10MB per image

### Feature 2: Interactive Workspace

**Purpose**: Provide intuitive controls for positioning and scaling images.

**Key Capabilities:**
- Independent zoom controls (1x-3x range) per image
- Mouse wheel zoom with Cmd/Ctrl modifier
- Drag-to-pan with visual cursor feedback
- Real-time preview of adjustments
- Percentage-based coordinate system (xPos, yPos: 0-100)

**Technical Details:**
- Use CSS transforms for smooth preview interactions
- Calculate pan offsets based on image overflow dimensions
- Implement "cover" fit: `scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight)`
- Clamp zoom values to prevent extreme scaling
- Debounce localStorage updates during drag operations

### Feature 3: Visual Customization

**Purpose**: Allow users to customize output appearance for branding and platform requirements.

**Key Capabilities:**
- Aspect ratio selection: 16:9, 9:16, 21:9, 3:4, 4:3, Auto
- Editable "Then" and "Now" text labels
- Three divider arrow styles: Modern, Classic, Minimal
- Three color options: White, Black, Red
- Dynamic sizing based on canvas dimensions

**Technical Details:**
- Font size: ~5% of canvas height (minimum 24px)
- Arrow size: ~15% of canvas height
- Label rendering with stroke for contrast (strokeWidth: fontSize * 0.1)
- Arrow centered on vertical split between images
- Use Canvas `fillText` and `strokeText` for labels

### Feature 4: Canvas Export Engine

**Purpose**: Generate high-resolution composite images with professional quality.

**Key Capabilities:**
- Canvas-based compositing with precise source cropping
- Resolution determined by larger input image dimensions
- One-click PNG export with quality preservation
- Efficient rendering pipeline

**Technical Details:**
- Create hidden canvas element for export
- Calculate source crop rectangles based on zoom/pan state:
  - `sx = (imageWidth * scale - canvasWidth/2) * (xPos/100)`
  - `sy = (imageHeight * scale - canvasHeight/2) * (yPos/100)`
- Draw "Then" image on left half, "Now" on right half
- Render divider arrow and labels on top
- Export with `canvas.toBlob()` for efficient memory usage
- Filename format: `then_and_now_${timestamp}.png`

## 8. Technology Stack

### Core Runtime & Build
- **Bun 1.3.6**: JavaScript runtime and package manager
- **Vite 7.3.1**: Build tool and dev server
- **TypeScript 5.9.3**: Type-safe JavaScript with strict mode enabled

### Frontend Framework
- **React 19.2.3**: UI library with concurrent features
- **React-Router-Dom 7.12.0**: Client-side routing (if multi-page needed)

### UI & Styling
- **@heroui/react 2.8.7**: Component library for buttons, inputs, modals, dropdowns
- **TailwindCSS 3.4.19**: Utility-first CSS framework
- **tailwind-variants 3.2.2**: Type-safe variant system for reusable styles
- **framer-motion 12.28.1**: Animation library for smooth transitions

### Storage & State
- **localStorage**: Browser-native persistence for images and settings
- **React Hooks**: State management (useState, useReducer, useContext)

### Optional Dependencies
- **Vitest**: Testing framework (Vite-native)
- **ESLint**: Code quality and linting
- **Prettier**: Code formatting

### Third-Party Integrations
- **None**: Pure client-side application with no external API dependencies

## 9. Security & Configuration

### Authentication & Authorization
- **Not Applicable**: No user accounts or authentication required
- All data stored locally in user's browser

### Configuration Management

**Environment Variables:**
- None required (pure client-side application)

**Build Configuration:**
- `vite.config.ts`: Build optimization, asset handling
- `tsconfig.json`: TypeScript strict mode, path aliases
- `tailwind.config.js`: Theme customization, dark mode

**Runtime Settings:**
- User preferences stored in localStorage:
  - Last used aspect ratio
  - Preferred arrow style and color
  - Zoom/pan state for persistence

### Security Scope

**✅ In Scope:**
- Client-side input validation (file types, sizes)
- localStorage quota exceeded error handling
- XSS prevention for user-generated text labels
- Content Security Policy headers in production
- HTTPS-only deployment

**❌ Out of Scope:**
- Server-side security (no server)
- User authentication/authorization
- API rate limiting
- Database security
- Multi-tenant isolation

### Deployment Considerations

**Static Site Hosting:**
- Deploy to Vercel, Netlify, AWS S3 + CloudFront, or GitHub Pages
- Build output: `dist/` folder with static assets
- No server-side rendering or API routes required

**Performance:**
- Code splitting for optimal load times
- Lazy loading for non-critical components
- Asset optimization via Vite

**Monitoring:**
- Client-side error tracking (optional: Sentry)
- Analytics (optional: privacy-focused solution)

## 10. API Specification

**Not Applicable**: Then & Now is a pure client-side application with no backend API.

All functionality is implemented using browser APIs:
- **FileReader API**: Image upload and loading
- **Canvas API**: Image compositing and export
- **localStorage API**: State persistence
- **Blob API**: PNG export and download

## 11. Success Criteria

### MVP Success Definition
The MVP is successful when a first-time user can upload two images, adjust their positioning, customize the visual style, and export a high-quality comparison image in under 2 minutes—all without tutorials or external help.

### Functional Requirements

**Core Functionality:**
- ✅ Users can upload two images via drag-and-drop or file picker
- ✅ Images persist across browser sessions via localStorage
- ✅ Users can independently zoom (1x-3x) and pan each image
- ✅ Real-time preview updates as users adjust images
- ✅ Users can select from 6 aspect ratios (16:9, 9:16, 21:9, 3:4, 4:3, Auto)
- ✅ Users can edit "Then" and "Now" text labels
- ✅ Users can choose from 3 arrow styles and 3 colors
- ✅ One-click export generates high-resolution PNG
- ✅ Sample mode loads demonstration images

**Quality Indicators:**
- ✅ Exported image resolution matches or exceeds input quality
- ✅ Zoom/pan interactions run at 60fps
- ✅ Export completes in < 2 seconds for typical images (< 5MB each)
- ✅ Initial page load < 2 seconds on 3G connection
- ✅ No data loss on browser refresh (localStorage persistence)

**User Experience Goals:**
- ✅ Intuitive controls requiring no tutorials
- ✅ Clear visual feedback for all interactions
- ✅ Graceful error handling with helpful messages
- ✅ Accessible keyboard navigation
- ✅ Responsive design (mobile and desktop)

### Quality Metrics

**Performance:**
- Time to Interactive: < 3 seconds
- Zoom/Pan FPS: 60fps
- Export Time: < 2 seconds (5MB images)
- Memory Usage: Efficient cleanup after export

**Usability:**
- First Comparison Time: < 2 minutes (new users)
- Error Rate: < 5% failed uploads
- User Satisfaction: Qualitative feedback positive

**Reliability:**
- Zero data loss with localStorage
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Graceful degradation for unsupported features

## 12. Implementation Phases

### Phase 1: Foundation & Core Upload (Week 1)

**Goal**: Establish project structure and basic image upload functionality.

**Deliverables:**
- ✅ Project scaffolding with Bun, Vite, React, TypeScript
- ✅ TailwindCSS and HeroUI integration
- ✅ Dark theme configuration
- ✅ Image upload component (drag-and-drop + file picker)
- ✅ localStorage persistence for uploaded images
- ✅ Basic image display in workspace

**Validation:**
- Users can upload two images
- Images persist across browser refresh
- Dark theme renders correctly

### Phase 2: Interactive Workspace (Week 2)

**Goal**: Implement zoom, pan, and real-time preview functionality.

**Deliverables:**
- ✅ Zoom controls (UI buttons + mouse wheel)
- ✅ Drag-to-pan functionality with percentage-based coordinates
- ✅ "Cover" fit logic implementation
- ✅ Real-time preview updates
- ✅ Geometry utility functions (zoom/pan calculations)
- ✅ Custom hooks: `useImageState`, `useLocalStorage`

**Validation:**
- Users can zoom and pan each image independently
- Interactions run at 60fps
- Pan positions persist in localStorage

### Phase 3: Visual Customization & Settings (Week 3)

**Goal**: Add aspect ratio selection, labels, and arrow customization.

**Deliverables:**
- ✅ Settings panel component with HeroUI controls
- ✅ Aspect ratio selector (16:9, 9:16, 21:9, 3:4, 4:3, Auto)
- ✅ Editable text labels for "Then" and "Now"
- ✅ Arrow style selector (Modern, Classic, Minimal)
- ✅ Color picker (White, Black, Red)
- ✅ Framer Motion animations for panel transitions
- ✅ Sample mode with pre-loaded images

**Validation:**
- Users can customize all visual elements
- Settings persist in localStorage
- Sample mode demonstrates all features

### Phase 4: Canvas Export & Polish (Week 4)

**Goal**: Implement high-resolution export and final UX polish.

**Deliverables:**
- ✅ Canvas compositing engine with precise source cropping
- ✅ Arrow rendering (all three styles)
- ✅ Label rendering with high-contrast stroke
- ✅ PNG export with one-click download
- ✅ Error handling and user feedback
- ✅ Keyboard shortcuts (Esc, Cmd/Ctrl+Enter)
- ✅ Responsive design refinements
- ✅ Performance optimization (memoization, lazy loading)
- ✅ Cross-browser testing

**Validation:**
- Exported images match preview quality
- Export completes in < 2 seconds
- All features work across Chrome, Firefox, Safari, Edge
- End-to-end user flow takes < 2 minutes

## 13. Future Considerations

### Post-MVP Enhancements

**Advanced Image Manipulation:**
- Rotation controls for each image
- Brightness/contrast adjustments
- Crop tool for pre-processing
- Multiple comparison layouts (side-by-side, top-bottom, quad)

**Batch Processing:**
- Upload multiple image pairs
- Apply consistent settings across batch
- Bulk export with sequential numbering

**Export Options:**
- Additional formats (JPEG, WebP)
- Quality/compression settings
- Watermark support
- Custom canvas dimensions

**User Experience:**
- Undo/redo history
- Preset templates for common use cases
- Keyboard shortcut customization
- Tutorial/onboarding flow

### Integration Opportunities

**Social Media:**
- Direct posting to Instagram, Twitter, Facebook
- Platform-specific aspect ratio presets
- Metadata embedding (captions, hashtags)

**Cloud Storage:**
- Optional cloud backup (Google Drive, Dropbox)
- Cross-device sync
- Project sharing via links

**Third-Party Tools:**
- Figma/Sketch plugin
- WordPress integration
- API for programmatic access

### Advanced Features

**AI-Powered Enhancements:**
- Auto-alignment of similar images
- Smart cropping suggestions
- Background removal
- Style transfer

**Collaboration:**
- Real-time co-editing
- Comment/annotation system
- Version history

**Analytics:**
- Usage tracking for creators
- A/B testing for marketers
- Engagement metrics

## 14. Risks & Mitigations

### Risk 1: Browser localStorage Quota Exceeded
**Impact**: High - Users cannot save images, breaking core persistence feature.

**Mitigation:**
- Implement quota detection and graceful error handling
- Compress images before storing (reduce quality or dimensions)
- Provide clear error message with instructions to clear old data
- Consider IndexedDB as fallback for larger storage capacity

### Risk 2: Performance Degradation with Large Images
**Impact**: Medium - Slow zoom/pan or export times frustrate users.

**Mitigation:**
- Implement file size limits (10MB per image)
- Use CSS transforms for preview (not Canvas re-rendering)
- Optimize Canvas operations with efficient source cropping
- Add loading indicators for export process
- Test with 4K+ images during development

### Risk 3: Cross-Browser Canvas API Inconsistencies
**Impact**: Medium - Export quality or functionality varies across browsers.

**Mitigation:**
- Test extensively on Chrome, Firefox, Safari, Edge
- Use polyfills for missing Canvas features
- Document browser compatibility requirements
- Implement feature detection with fallback messaging

### Risk 4: User Confusion with Percentage-Based Positioning
**Impact**: Low - Users may not understand how pan coordinates work.

**Mitigation:**
- Provide visual feedback (grid overlay, position indicator)
- Use intuitive drag-to-pan instead of numeric inputs
- Add "Reset Position" button for easy recovery
- Include sample mode for exploration without consequences

### Risk 5: Dependency Version Conflicts
**Impact**: Low - Strict version requirements may cause build issues.

**Mitigation:**
- Lock all dependency versions in package.json
- Use Bun's lockfile (bun.lockb) for reproducible builds
- Document exact versions in README
- Test build process in clean environment
- Research latest docs for each dependency to ensure compatibility

## 15. Appendix

### Related Documents
- **README.md**: Project overview, setup instructions, usage guide
- **DEVLOG.md**: Development timeline and decision log (for hackathon submission)
- **.kiro/steering/**: Product, tech, and structure steering documents

### Key Dependencies & Documentation

**Core Technologies:**
- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Bun Documentation](https://bun.sh/docs)

**UI & Styling:**
- [HeroUI Documentation](https://heroui.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [tailwind-variants](https://www.tailwind-variants.org/)
- [Framer Motion API](https://www.framer.com/motion/)

**Browser APIs:**
- [Canvas API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [FileReader API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [localStorage API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Repository Structure

```
then-and-now/
├── src/                 # Source code
├── public/              # Static assets
├── tests/               # Test files
├── .kiro/               # Kiro CLI configuration
│   ├── steering/        # Project steering documents
│   └── prompts/         # Custom development prompts
├── dist/                # Build output (generated)
├── package.json         # Dependencies and scripts
├── bun.lockb            # Bun lockfile
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # TailwindCSS configuration
├── README.md            # Project documentation
├── DEVLOG.md            # Development log
└── PRD.md               # This document
```

### Success Metrics Summary

**MVP Launch Criteria:**
- All Phase 4 deliverables complete
- Cross-browser testing passed
- Performance benchmarks met (< 2s export, 60fps interactions)
- End-to-end user flow validated (< 2 minutes first comparison)

**Post-Launch Monitoring:**
- User feedback collection
- Performance monitoring (load times, export times)
- Error tracking (failed uploads, localStorage issues)
- Browser compatibility reports

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-22  
**Status**: Ready for Implementation
