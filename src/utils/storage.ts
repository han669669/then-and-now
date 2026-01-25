/**
 * Mobile-safe localStorage utilities with fallbacks
 */

// Check if localStorage is available and working
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, 'test');
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Cache for private browsing detection (computed once)
let privateBrowsingCache: boolean | null = null;

// Check if we're in Safari private browsing mode (cached at module level)
function isPrivateBrowsing(): boolean {
  if (privateBrowsingCache !== null) {
    return privateBrowsingCache;
  }
  
  try {
    // In Safari private browsing, localStorage exists but has 0 quota
    localStorage.setItem('__private_test__', '1');
    localStorage.removeItem('__private_test__');
    privateBrowsingCache = false;
  } catch (e) {
    // QuotaExceededError in private browsing
    privateBrowsingCache = e instanceof DOMException && (
      e.code === 22 || 
      e.code === 1014 || 
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    );
  }
  
  return privateBrowsingCache;
}

// In-memory fallback for when localStorage is not available
const memoryStorage = new Map<string, string>();

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    
    if (isLocalStorageAvailable() && !isPrivateBrowsing()) {
      // Try localStorage first
      window.localStorage.setItem(key, serialized);
    } else {
      // Fallback to memory storage
      memoryStorage.set(key, serialized);
      if (isPrivateBrowsing()) {
        console.warn('Private browsing detected, using memory storage');
      } else {
        console.warn('localStorage not available, using memory storage');
      }
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded, clearing old data');
      // Clear old image data to make space
      try {
        window.localStorage.removeItem('then-and-now-images');
        // Try saving again
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (retryError) {
        // If still failing, use memory storage
        memoryStorage.set(key, JSON.stringify(value));
        console.warn('Using memory storage due to localStorage quota issues');
      }
    } else {
      // For other errors, try memory storage
      memoryStorage.set(key, JSON.stringify(value));
      console.error('localStorage error, using memory storage:', error);
    }
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    let item: string | null = null;
    
    if (isLocalStorageAvailable() && !isPrivateBrowsing()) {
      item = window.localStorage.getItem(key);
    }
    
    // If localStorage failed or returned null, try memory storage
    if (!item && memoryStorage.has(key)) {
      item = memoryStorage.get(key) || null;
    }
    
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    }
    memoryStorage.delete(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
}

/**
 * Check storage quota - now just logs a warning, doesn't clear aggressively
 * (Fix #6: Removed aggressive storage clearing that caused intermittent data loss)
 * 
 * Note: Images are now stored in IndexedDB, not localStorage.
 * localStorage only stores small metadata (~100 bytes per image).
 */
export function checkStorageQuota(): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    // Estimate storage usage
    let totalSize = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalSize += localStorage[key].length;
      }
    }
    
    const sizeMB = totalSize / (1024 * 1024);
    
    // Just log a warning - don't clear data automatically
    if (sizeMB > 4) {
      console.warn(`localStorage usage: ${sizeMB.toFixed(2)}MB - approaching quota limit`);
    }
    
    // Note: Legacy keys 'then-and-now-images' and 'then-and-now-user-images' 
    // contained base64 images from older versions. We no longer automatically 
    // delete them to avoid data loss. Users can manually clear browser data 
    // if storage is an issue. New images are stored in IndexedDB instead.
  } catch (error) {
    console.warn('Storage check failed:', error);
  }
}

/**
 * Test localStorage functionality and provide fallback
 */
export function testLocalStorage(): boolean {
  try {
    const testKey = '__test_storage__';
    const testValue = 'test';
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return retrieved === testValue;
  } catch {
    return false;
  }
}
