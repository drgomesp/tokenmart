import React, { useEffect, useRef, useState } from 'react';

export function useSessionStorage<T>(key: string, defaultState: T)
    : [ T, React.Dispatch<React.SetStateAction<T>> ] {

    const state = useState<T>(() => {
        try {
            const value = sessionStorage.getItem(key);
            if (value) return JSON.parse(value) as T;
        } catch (err: any) {
            if (typeof document !== "undefined" && typeof window !== "undefined") {
                console.error(err);
            }
        }

        return defaultState;
    });

    const value = state[0];
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        try {
            if (value === null) {
                sessionStorage.removeItem(key);
            } else {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
        } catch (err: any) {
            if (typeof document !== "undefined" && typeof window !== "undefined") {
                console.error(err);
            }
        }
    }, [ value ]);

    return state;
}
