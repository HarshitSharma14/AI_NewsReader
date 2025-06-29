
// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useNews } from '@/hooks/useNews';
import { ArticleGrid } from '@/components/news/ArticleGrid';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function HomePage() {
  const {
    articles,
    isLoading,
    error,
    fetchTopHeadlines,
    loadMore,
    hasMore
  } = useNews();

  useEffect(() => {
    fetchTopHeadlines();
  }, [fetchTopHeadlines]);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Latest News
        </h1>
        <p className="text-muted-foreground">
          Stay updated with the latest headlines powered by AI insights
        </p>
      </div>

      <div className="bg-red-500 text-white p-4 rounded-lg">
        Tailwind is working!
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 rounded-lg">
          <p className="text-red-800 dark:text-red-200">
            {error}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => fetchTopHeadlines()}
          >
            Try again
          </Button>
        </div>
      )}

      <ArticleGrid
        articles={articles}
        isLoading={isLoading}
        showSkeletons={9}
      />

      {hasMore && !isLoading && articles.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} variant="outline">
            Load more articles
          </Button>
        </div>
      )}

      {isLoading && articles.length > 0 && (
        <div className="flex justify-center mt-8">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}