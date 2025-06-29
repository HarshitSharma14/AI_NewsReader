

// src/hooks/useNews.ts
import { useEffect, useCallback } from 'react';
import { useNewsStore } from '@/lib/store/news-store';
import { newsApi } from '@/lib/api/news-api';
import { SearchFilters } from '@/types';

export const useNews = () => {
    const {
        articles,
        searchFilters,
        isLoading,
        error,
        totalResults,
        currentPage,
        setArticles,
        addArticles,
        setLoading,
        setError,
        setTotalResults,
        setCurrentPage,
    } = useNewsStore();

    const fetchTopHeadlines = useCallback(async (
        category: string = 'general',
        page: number = 1,
        append: boolean = false
    ) => {
        setLoading(true);
        setError(null);

        try {
            const { articles: newArticles, totalResults } = await newsApi.getTopHeadlines(
                category,
                10,
                page
            );

            if (append) {
                addArticles(newArticles);
            } else {
                setArticles(newArticles);
            }

            setTotalResults(totalResults);
            setCurrentPage(page);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch news');
        } finally {
            setLoading(false);
        }
    }, [setArticles, addArticles, setLoading, setError, setTotalResults, setCurrentPage]);

    const searchArticles = useCallback(async (
        filters: SearchFilters,
        page: number = 1,
        append: boolean = false
    ) => {
        setLoading(true);
        setError(null);

        try {
            const { articles: newArticles, totalResults } = await newsApi.searchArticles(
                filters,
                10,
                page
            );

            if (append) {
                addArticles(newArticles);
            } else {
                setArticles(newArticles);
            }

            setTotalResults(totalResults);
            setCurrentPage(page);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search articles');
        } finally {
            setLoading(false);
        }
    }, [setArticles, addArticles, setLoading, setError, setTotalResults, setCurrentPage]);

    const loadMore = useCallback(() => {
        if (searchFilters.query) {
            searchArticles(searchFilters, currentPage + 1, true);
        } else {
            fetchTopHeadlines(searchFilters.category, currentPage + 1, true);
        }
    }, [searchFilters, currentPage, searchArticles, fetchTopHeadlines]);

    return {
        articles,
        searchFilters,
        isLoading,
        error,
        totalResults,
        currentPage,
        fetchTopHeadlines,
        searchArticles,
        loadMore,
        hasMore: articles.length < totalResults,
    };
};
