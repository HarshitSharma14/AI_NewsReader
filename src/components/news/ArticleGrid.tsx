

// src/components/news/ArticleGrid.tsx
'use client';

import { Article } from '@/types';
import { ArticleCard } from './ArticleCard';
import { ArticleSkeleton } from './ArticleSkeleton';

interface ArticleGridProps {
    articles: Article[];
    isLoading?: boolean;
    showSkeletons?: number;
}

export const ArticleGrid = ({
    articles,
    isLoading = false,
    showSkeletons = 6
}: ArticleGridProps) => {
    if (isLoading && articles.length === 0) {
        return (
            <div className="article-grid">
                {Array.from({ length: showSkeletons }).map((_, index) => (
                    <ArticleSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-gray-500 dark:text-gray-400">
                    <svg
                        className="mx-auto h-12 w-12 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3"
                        />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-sm max-w-sm">
                        Try adjusting your search terms or check back later for new articles.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="article-grid">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
            {isLoading && (
                <>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ArticleSkeleton key={`loading-${index}`} />
                    ))}
                </>
            )}
        </div>
    );
};
