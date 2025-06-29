
// src/lib/store/news-store.ts
import { create } from 'zustand';
import { Article, SearchFilters, LoadingState } from '@/types';

interface NewsState extends LoadingState {
    articles: Article[];
    selectedArticle: Article | null;
    searchFilters: SearchFilters;
    totalResults: number;
    currentPage: number;

    // Actions
    setArticles: (articles: Article[]) => void;
    addArticles: (articles: Article[]) => void;
    setSelectedArticle: (article: Article | null) => void;
    setSearchFilters: (filters: Partial<SearchFilters>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setTotalResults: (total: number) => void;
    setCurrentPage: (page: number) => void;
    resetSearch: () => void;
}

const initialFilters: SearchFilters = {
    query: '',
    category: 'general',
    sortBy: 'publishedAt',
    language: 'en',
};

export const useNewsStore = create<NewsState>((set, get) => ({
    // Initial state
    articles: [],
    selectedArticle: null,
    searchFilters: initialFilters,
    totalResults: 0,
    currentPage: 1,
    isLoading: false,
    error: null,

    // Actions
    setArticles: (articles) => set({ articles }),

    addArticles: (newArticles) => {
        const { articles } = get();
        const existingIds = new Set(articles.map(a => a.id));
        const uniqueNewArticles = newArticles.filter(a => !existingIds.has(a.id));
        set({ articles: [...articles, ...uniqueNewArticles] });
    },

    setSelectedArticle: (article) => set({ selectedArticle: article }),

    setSearchFilters: (filters) => set((state) => ({
        searchFilters: { ...state.searchFilters, ...filters }
    })),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    setTotalResults: (totalResults) => set({ totalResults }),

    setCurrentPage: (currentPage) => set({ currentPage }),

    resetSearch: () => set({
        articles: [],
        searchFilters: initialFilters,
        currentPage: 1,
        totalResults: 0,
        error: null,
    }),
}));