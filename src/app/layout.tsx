
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI News Dashboard',
  description: 'Stay informed with AI-powered news summaries and insights',
  keywords: ['news', 'AI', 'summaries', 'articles', 'current events'],
  authors: [{ name: 'AI News Dashboard' }],
  creator: 'AI News Dashboard',
  publisher: 'AI News Dashboard',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'AI News Dashboard',
    title: 'AI News Dashboard',
    description: 'Stay informed with AI-powered news summaries and insights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI News Dashboard',
    description: 'Stay informed with AI-powered news summaries and insights',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}