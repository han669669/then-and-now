/**
 * IndexedDB utilities for storing image Blobs
 * Falls back to in-memory storage if IndexedDB is not available
 */

const DB_NAME = 'then-and-now-db';
const DB_VERSION = 1;
const STORE_NAME = 'images';

type ImageId = 'then' | 'now';

let db: IDBDatabase | null = null;
const memoryFallback = new Map<ImageId, Blob>();

function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
}

export async function initDB(): Promise<IDBDatabase | null> {
  if (db) return db;

  if (!isIndexedDBAvailable()) {
    console.warn('IndexedDB not available, using memory storage');
    return null;
  }

  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        resolve(null);
      };

      request.onsuccess = () => {
        db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBOpenDBRequest).result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      };
    } catch (error) {
      console.error('IndexedDB initialization error:', error);
      resolve(null);
    }
  });
}

export async function saveImageBlob(id: ImageId, blob: Blob): Promise<void> {
  try {
    const database = await initDB();

    if (!database) {
      memoryFallback.set(id, blob);
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = database.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(blob, id);

        request.onerror = () => {
          console.error('Failed to save image blob:', request.error);
          memoryFallback.set(id, blob);
          resolve();
        };

        request.onsuccess = () => {
          resolve();
        };
      } catch (error) {
        console.error('Transaction error:', error);
        memoryFallback.set(id, blob);
        resolve();
      }
    });
  } catch (error) {
    console.error('saveImageBlob error:', error);
    memoryFallback.set(id, blob);
  }
}

export async function loadImageBlob(id: ImageId): Promise<Blob | null> {
  try {
    const database = await initDB();

    if (!database) {
      return memoryFallback.get(id) || null;
    }

    return new Promise((resolve) => {
      try {
        const transaction = database.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onerror = () => {
          console.error('Failed to load image blob:', request.error);
          resolve(memoryFallback.get(id) || null);
        };

        request.onsuccess = () => {
          const result = request.result as Blob | undefined;
          resolve(result || memoryFallback.get(id) || null);
        };
      } catch (error) {
        console.error('Transaction error:', error);
        resolve(memoryFallback.get(id) || null);
      }
    });
  } catch (error) {
    console.error('loadImageBlob error:', error);
    return memoryFallback.get(id) || null;
  }
}

export async function deleteImageBlob(id: ImageId): Promise<void> {
  try {
    memoryFallback.delete(id);
    const database = await initDB();

    if (!database) {
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = database.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onerror = () => {
          console.error('Failed to delete image blob:', request.error);
          resolve();
        };

        request.onsuccess = () => {
          resolve();
        };
      } catch (error) {
        console.error('Transaction error:', error);
        resolve();
      }
    });
  } catch (error) {
    console.error('deleteImageBlob error:', error);
  }
}

export async function clearAllImages(): Promise<void> {
  try {
    memoryFallback.clear();
    const database = await initDB();

    if (!database) {
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = database.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onerror = () => {
          console.error('Failed to clear images:', request.error);
          resolve();
        };

        request.onsuccess = () => {
          resolve();
        };
      } catch (error) {
        console.error('Transaction error:', error);
        resolve();
      }
    });
  } catch (error) {
    console.error('clearAllImages error:', error);
  }
}

export function createObjectURLFromBlob(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeObjectURL(url: string): void {
  try {
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to revoke object URL:', error);
  }
}
