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

// Check if we're in Safari private browsing mode
function isPrivateBrowsing(): boolean {
  try {
    // In Safari private browsing, localStorage exists but has 0 quota
    localStorage.setItem('__private_test__', '1');
    localStorage.removeItem('__private_test__');
    return false;
  } catch (e) {
    // QuotaExceededError in private browsing
    return e instanceof DOMException && (
      e.code === 22 || 
      e.code === 1014 || 
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    );
  }
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
 * Check storage quota and clear if needed (mobile Safari specific)
 */
export function checkStorageQuota(): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    // Estimate storage usage
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length;
      }
    }
    
    // If storage is getting full (>2MB on mobile Safari), clear old data
    const sizeMB = totalSize / (1024 * 1024);
    if (sizeMB > 2) {
      console.warn(`Storage getting full (${sizeMB.toFixed(1)}MB), clearing old data`);
      // Keep only the most recent user images and settings
      const userImages = localStorage.getItem('then-and-now-user-images');
      const settings = localStorage.getItem('then-and-now-settings');
      localStorage.clear();
      if (userImages) {
        localStorage.setItem('then-and-now-user-images', userImages);
      }
      if (settings) {
        localStorage.setItem('then-and-now-settings', settings);
      }
    }
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
