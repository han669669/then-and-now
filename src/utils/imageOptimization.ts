/**
 * Mobile-optimized image processing utilities
 * Handles HEIF conversion and format validation
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
 * Process image file with HEIF conversion support
 */
export function processImageFile(file: File): Promise<{ file: File; dataUrl: string }> {
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