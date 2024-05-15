/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: ['res.cloudinary.com','randomuser.me']}, //The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead in your next project
    experimental: {
        reactRoot: true,
        suppressHydrationWarning: true,
    }
}

module.exports = nextConfig
