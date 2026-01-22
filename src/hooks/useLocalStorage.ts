import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return loadFromLocalStorage(key, initialValue);
  });

  useEffect(() => {
    saveToLocalStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
