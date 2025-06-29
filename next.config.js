
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'newsapi.org',
            'images.unsplash.com',
            'source.unsplash.com',
            'via.placeholder.com',
            'picsum.photos'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
    },
}

module.exports = nextConfig