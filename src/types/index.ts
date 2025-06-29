import { Article } from './news';


// src/types/index.ts
export * from './news';
export * from './ai';

export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface BookmarkState {
    bookmarkedArticles: Article[];
    isBookmarked: (articleId: string) => boolean;
    addBookmark: (article: Article) => void;
    removeBookmark: (articleId: string) => void;
}

export interface ThemeState {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}