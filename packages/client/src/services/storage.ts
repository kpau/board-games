import config from '../config.json';

const ns = config.storage.namespace;

export type StorageType = 'local' | 'session';

type StorageResult<T> = [T | null, (value: T | null) => void];

export function getStorage<T>(type: StorageType, key: string): StorageResult<T> {
  const storage: Storage = type === 'local' ? localStorage : sessionStorage;
  const nsKey = `${ns}.${key}`;

  const strValue = storage.getItem(nsKey);
  const value: T | null = strValue === null ? null : JSON.parse(strValue);

  const setValue = (newValue: T | null): void => {
    const newStrValue = JSON.stringify(newValue);
    storage.setItem(nsKey, newStrValue);
  };

  return [value, setValue];
}

export function getLocalStorage<T>(key: string): StorageResult<T> {
  return getStorage('local', key);
}

export function getSessionStorage<T>(key: string): StorageResult<T> {
  return getStorage('session', key);
}
