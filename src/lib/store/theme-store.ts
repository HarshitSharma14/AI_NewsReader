

// src/lib/store/theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'system',

            setTheme: (theme) => {
                set({ theme });

                if (typeof window !== 'undefined') {
                    const root = window.document.documentElement;

                    if (theme === 'system') {
                        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                            ? 'dark'
                            : 'light';
                        root.classList.toggle('dark', systemTheme === 'dark');
                    } else {
                        root.classList.toggle('dark', theme === 'dark');
                    }
                }
            },

            toggleTheme: () => {
                const { theme } = get();
                const newTheme = theme === 'light' ? 'dark' : 'light';
                get().setTheme(newTheme);
            },
        }),
        {
            name: 'theme-storage',
        }
    )
);
