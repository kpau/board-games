/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import { StorageType, getStorage } from '../services/storage';

export function useStorage<T>(type: StorageType, key: string) {
  const [storage, setStorage] = getStorage<T>(type, key);
  const [state, setState] = useState<T | null>(storage);

  useEffect(() => {
    setStorage(state);
  }, [setStorage, state]);

  return [state, setState] as const;
}

export function useLocalStorage<T>(key: string) {
  return useStorage<T>('local', key);
}

export function useSessionStorage<T>(key: string) {
  return useStorage<T>('session', key);
}
