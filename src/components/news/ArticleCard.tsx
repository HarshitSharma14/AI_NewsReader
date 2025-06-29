
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/types/news';

interface ArticleCardProps {
    article: Article;
    onClick?: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
    return (
        <Card className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group">
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                        {article.source?.name || 'Unknown Source'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
                    </span>
                </div>
                <CardTitle className="line-clamp-2 text-base group-hover:text-primary transition-colors">
                    {article.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {article.urlToImage && (
                    <div className="aspect-video overflow-hidden rounded-md">
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                    </div>
                )}
                <CardDescription className="line-clamp-3 text-sm">
                    {article.description}
                </CardDescription>
            </CardContent>
        </Card>
    );
};  
