

// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '@/lib/utils/storage';

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        return getFromLocalStorage(key, initialValue);
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            setToLocalStorage(key, valueToStore);
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};
