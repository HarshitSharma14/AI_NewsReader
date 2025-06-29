

// src/hooks/useBookmarks.ts
import { useBookmarkStore } from '@/lib/store/bookmark-store';
import { Article } from '@/types';

export const useBookmarks = () => {
    const {
        bookmarkedArticles,
        isBookmarked,
        addBookmark,
        removeBookmark,
        clearBookmarks,
        getBookmarkCount,
    } = useBookmarkStore();

    const toggleBookmark = (article: Article) => {
        if (isBookmarked(article.id)) {
            removeBookmark(article.id);
        } else {
            addBookmark(article);
        }
    };

    return {
        bookmarkedArticles,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        clearBookmarks,
        bookmarkCount: getBookmarkCount(),
    };
};