

// src/components/common/ErrorBoundary.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const Fallback = this.props.fallback;
                return (
                    <Fallback
                        error={this.state.error}
                        reset={() => this.setState({ hasError: false, error: undefined })}
                    />
                );
            }

            return (
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">Something went wrong</CardTitle>
                        <CardDescription>
                            An unexpected error occurred. Please try refreshing the page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => this.setState({ hasError: false, error: undefined })}
                            className="w-full"
                        >
                            Try again
                        </Button>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}