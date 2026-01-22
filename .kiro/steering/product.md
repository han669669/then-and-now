# Product Overview

## Product Purpose
**Then & Now** is a browser-based utility for creating high-quality "Before & After" comparison images. It enables users to upload two images, adjust their positioning and scale interactively, and composite them into a single professional comparison image with customizable divider arrows and text labels. All processing happens client-side for privacy and speed.

## Target Users
- **Content Creators**: Social media influencers, YouTubers, and bloggers creating transformation content
- **Photographers**: Professionals showcasing editing skills or restoration work
- **Marketers**: Teams creating before/after product demonstrations
- **Hobbyists**: Anyone wanting to create compelling visual comparisons without complex software

**User Needs:**
- Quick, intuitive image comparison creation
- High-quality output without technical expertise
- Privacy (no server uploads)
- Professional-looking results with minimal effort

## Key Features

### Image Management
- Dual image upload with localStorage persistence
- Sample mode for demonstration
- Independent image manipulation (zoom, pan, scale)
- Remove and replace functionality

### Interactive Workspace
- Real-time preview with drag-and-drop positioning
- Zoom controls (1x-3x range) via UI buttons and mouse wheel
- Percentage-based coordinate system for precise positioning
- "Cover" fit logic maintaining aspect ratios

### Visual Customization
- Multiple aspect ratios: 16:9, 9:16, 21:9, 3:4, 4:3, Auto
- Editable "Then" and "Now" text labels with high-contrast rendering
- Three divider arrow styles: Modern, Classic, Minimal
- Color options: White, Black, Red
- Dynamic sizing based on canvas dimensions

### Export & Processing
- Canvas-based high-resolution compositing
- One-click PNG export with quality preservation
- Client-side processing (no server uploads)
- Efficient rendering with precise source cropping

## Business Objectives
- **User Adoption**: Become the go-to tool for quick comparison image creation
- **Quality**: Deliver professional-grade output rivaling desktop software
- **Performance**: Instant processing with smooth, responsive interactions
- **Accessibility**: Zero learning curve for non-technical users

## User Journey

1. **Entry**: User lands on dark-themed dashboard
2. **Upload**: Drag/drop or select "Then" and "Now" images (or load samples)
3. **Adjust**: Independently zoom and pan each image to frame the comparison
4. **Customize**: Select aspect ratio, edit labels, choose arrow style/color
5. **Preview**: Real-time visualization of final composition
6. **Export**: One-click download of high-quality PNG
7. **Iterate**: Adjust and re-export as needed (state persists via localStorage)

## Success Criteria
- **Usability**: Users can create their first comparison in under 2 minutes
- **Quality**: Output resolution matches or exceeds input image quality
- **Performance**: Sub-second rendering and export times
- **Reliability**: Zero data loss with localStorage persistence
- **Satisfaction**: Professional-looking results without manual editing
