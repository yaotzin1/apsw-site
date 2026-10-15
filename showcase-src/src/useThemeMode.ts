import { useEffect, useState } from 'react';
import type { ThemeMode } from './theme';

const STORAGE_KEY = 'apsw_theme';

export function readThemeMode(): ThemeMode {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/** Follows `<html data-theme>`, which the inline head script sets before React runs. */
export function useThemeMode(): ThemeMode {
    const [mode, setMode] = useState<ThemeMode>(readThemeMode);
    useEffect(() => {
        const observer = new MutationObserver(() => setMode(readThemeMode()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);
    return mode;
}

export function toggleThemeMode(): void {
    const next: ThemeMode = readThemeMode() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
        localStorage.setItem(STORAGE_KEY, next);
    } catch {
        // Private mode or blocked storage: the attribute still switched for this page.
    }
}
