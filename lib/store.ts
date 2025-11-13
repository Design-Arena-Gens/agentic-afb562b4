import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ar' | 'fr';

interface AppState {
  theme: 'light' | 'dark';
  language: Language;
  bookmarks: string[];
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  addBookmark: (bookmark: string) => void;
  removeBookmark: (bookmark: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      bookmarks: [],
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setLanguage: (lang) => set({ language: lang }),
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        })),
      removeBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b !== bookmark),
        })),
    }),
    {
      name: 'islamic-companion-storage',
    }
  )
);
