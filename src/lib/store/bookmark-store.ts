

// src/lib/store/bookmark-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article } from '@/types';

interface BookmarkState {
    bookmarkedArticles: Article[];
    isBookmarked: (articleId: string) => boolean;
    addBookmark: (article: Article) => void;
    removeBookmark: (articleId: string) => void;
    clearBookmarks: () => void;
    getBookmarkCount: () => number;
}

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set, get) => ({
            bookmarkedArticles: [],

            isBookmarked: (articleId) => {
                const { bookmarkedArticles } = get();
                return bookmarkedArticles.some(article => article.id === articleId);
            },

            addBookmark: (article) => set((state) => {
                if (state.bookmarkedArticles.some(a => a.id === article.id)) {
                    return state; // Already bookmarked
                }
                return {
                    bookmarkedArticles: [...state.bookmarkedArticles, article]
                };
            }),

            removeBookmark: (articleId) => set((state) => ({
                bookmarkedArticles: state.bookmarkedArticles.filter(
                    article => article.id !== articleId
                )
            })),

            clearBookmarks: () => set({ bookmarkedArticles: [] }),

            getBookmarkCount: () => get().bookmarkedArticles.length,
        }),
        {
            name: 'bookmarks-storage',
        }
    )
);
