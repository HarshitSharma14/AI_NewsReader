

// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { Newspaper, Bookmark, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useBookmarks } from '@/hooks/useBookmarks';

export const Header = () => {
    const { bookmarkCount } = useBookmarks();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Newspaper className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold gradient-text">
                            AI News Dashboard
                        </span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/search" className="flex items-center space-x-2">
                            <Search className="h-4 w-4" />
                            <span className="hidden sm:inline">Search</span>
                        </Link>
                    </Button>

                    <Button variant="ghost" size="sm" asChild className="relative">
                        <Link href="/bookmarks" className="flex items-center space-x-2">
                            <Bookmark className="h-4 w-4" />
                            <span className="hidden sm:inline">Bookmarks</span>
                            {bookmarkCount > 0 && (
                                <Badge variant="secondary" className="ml-1 text-xs">
                                    {bookmarkCount}
                                </Badge>
                            )}
                        </Link>
                    </Button>

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};
