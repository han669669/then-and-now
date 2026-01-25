/**
 * Mobile-optimized image processing utilities
 * Handles HEIF conversion, format validation, and image resizing
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxFileSize?: number; // in MB
}

const DEFAULT_MOBILE_OPTIONS: ImageOptimizationOptions = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
  maxFileSize: 10, // 10MB max
};

const DEFAULT_DESKTOP_OPTIONS: ImageOptimizationOptions = {
  maxWidth: 3840,
  maxHeight: 3840,
  quality: 0.9,
  maxFileSize: 15, // 15MB max
};

/**
 * Detect if we're on a mobile device
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get appropriate optimization options based on device
 */
export function getOptimizationOptions(): ImageOptimizationOptions {
  return isMobileDevice() ? DEFAULT_MOBILE_OPTIONS : DEFAULT_DESKTOP_OPTIONS;
}

/**
 * Downscale image using canvas to reduce memory usage on mobile
 * Returns a new Blob with the resized image
 */
export async function downscaleImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.85
): Promise<Blob> {
  // Use createImageBitmap which respects EXIF orientation in modern browsers
  // This fixes the issue where mobile photos appear rotated 90 degrees
  const bitmap = await createImageBitmap(file);
  
  let { width, height } = bitmap;
  
  // Calculate new dimensions while maintaining aspect ratio
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  } else {
    // Image is already small enough, return original as blob
    bitmap.close();
    return file;
  }
  
  // Create canvas and draw resized image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Failed to get canvas context');
  }
  
  // Use high quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  
  // Preserve original format for PNG/WebP to maintain transparency
  // Fall back to JPEG for other formats (including HEIC conversions)
  const supportedFormats = ['image/png', 'image/webp'];
  const outputFormat = supportedFormats.includes(file.type) ? file.type : 'image/jpeg';
  
  // Convert to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      },
      outputFormat,
      quality
    );
  });
}

/**
 * Check if file is HEIF/HEIC format
 */
function isHEIFFormat(file: File): boolean {
  return (
    file.type === 'image/heif' || 
    file.type === 'image/heic' || 
    file.name.toLowerCase().endsWith('.heic') || 
    file.name.toLowerCase().endsWith('.heif')
  );
}

/**
 * Convert HEIF/HEIC to JPEG using dynamic import
 */
async function convertHEIFToJPEG(file: File): Promise<File> {
  try {
    // Dynamically import heic2any only when needed
    const { default: heic2any } = await import('heic2any');
    
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    }) as Blob;

    // Create new file with JPEG extension
    const fileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
    return new File([convertedBlob], fileName, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('HEIF conversion failed:', error);
    throw new Error('Failed to convert HEIF image. Please try converting to JPEG manually or change your iPhone camera settings to "Most Compatible".');
  }
}

/**
 * Process image file with HEIF conversion and mobile optimization
 * Returns a Blob (for IndexedDB storage) and an object URL (for display)
 */
export async function processImageFile(file: File): Promise<{ blob: Blob; objectUrl: string }> {
  try {
    let processedFile: File | Blob = file;

    // Convert HEIF to JPEG if needed (loads converter dynamically)
    if (isHEIFFormat(file)) {
      processedFile = await convertHEIFToJPEG(file);
    }

    // Validate the processed file
    const validation = validateImageFile(processedFile as File);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Downscale large images to reduce memory pressure on all devices
    // (100MP+ images can crash even desktop browsers)
    const options = getOptimizationOptions();
    if (options.maxWidth && options.maxHeight) {
      try {
        // Check if image exceeds max dimensions before downscaling
        const img = new Image();
        const imageUrl = URL.createObjectURL(processedFile);
        try {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error('Failed to load image for size check'));
            img.src = imageUrl;
          });
          
          // Only downscale if image exceeds limits
          if (img.naturalWidth > options.maxWidth || img.naturalHeight > options.maxHeight) {
            processedFile = await downscaleImage(
              processedFile as File,
              options.maxWidth,
              options.maxHeight,
              options.quality || 0.85
            );
          }
        } finally {
          URL.revokeObjectURL(imageUrl);
        }
      } catch (downscaleError) {
        console.warn('Downscaling failed, using original:', downscaleError);
        // Continue with original file if downscaling fails
      }
    }

    // Create object URL for display (no base64!)
    const objectUrl = URL.createObjectURL(processedFile);
    
    return { blob: processedFile, objectUrl };

  } catch (error) {
    throw error;
  }
}

/**
 * Legacy function for backwards compatibility - converts to data URL
 * @deprecated Use processImageFile which returns objectUrl instead
 */
export function processImageFileToDataUrl(file: File): Promise<{ file: File; dataUrl: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      let processedFile = file;

      // Convert HEIF to JPEG if needed (loads converter dynamically)
      if (isHEIFFormat(file)) {
        processedFile = await convertHEIFToJPEG(file);
      }

      // Validate the processed file
      const validation = validateImageFile(processedFile);
      if (!validation.valid) {
        reject(new Error(validation.error));
        return;
      }

      // Read as data URL
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          reject(new Error('Failed to read image file'));
          return;
        }
        
        resolve({ file: processedFile, dataUrl });
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read image file. The file may be corrupted.'));
      };
      
      reader.readAsDataURL(processedFile);

    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Validate image file before processing (after HEIF conversion)
 * This is the single source of validation - limits are device-aware via getOptimizationOptions()
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select an image file' };
  }

  // Check supported formats (HEIF should be converted by now)
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!supportedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `Unsupported format: ${file.type}. Supported formats: JPEG, PNG, WebP` 
    };
  }

  // Check file size
  const options = getOptimizationOptions();
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > (options.maxFileSize || 10)) {
    return { 
      valid: false, 
      error: `Image too large (${fileSizeMB.toFixed(1)}MB). Maximum size: ${options.maxFileSize}MB` 
    };
  }

  return { valid: true };
}