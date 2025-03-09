import {isNullOrUndefined} from "../utils/isNullOrUndefined.ts";

// eslint-disable-next-line
const STORAGE = {
    ACCESS_TOKEN : 'access_token',
    REFRESH_TOKEN : 'refresh_token'
} as const;

type StorageKeyType = typeof STORAGE[keyof typeof STORAGE];

export class StorageConnector {
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    setItem(key: StorageKeyType, value: any) {
        if (value !== null && value !== undefined) {
            const saveValue = JSON.stringify(value);
            this.storage.setItem(key, saveValue);
        }
    }

    getItem<T>(key: StorageKeyType): T | null {
        const value = this.storage.getItem(key);
        if (!isNullOrUndefined<string>(value)) {
            try {
                return JSON.parse(value);

            } catch (e) {
                console.error('Error parsing JSON', e);
                return null;
            }
        }
        return null;
    }

    removeItem(key: StorageKeyType) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}

export const localStorageAccessor = new StorageConnector(window.localStorage);
export const sessionStorageAccessor = new StorageConnector(window.sessionStorage);

