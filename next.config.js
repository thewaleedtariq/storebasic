/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'abundant-vacation-0e6250aa73.media.strapiapp.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
