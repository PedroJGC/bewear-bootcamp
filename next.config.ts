import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd4lgxe9bm8juw.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'fsc-projects-static.s3.us-east-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
