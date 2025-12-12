/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Disable Turbopack and force webpack
  experimental: {
    forceSwcTransforms: true,
  },
  // Disable Turbopack
  turbo: false,
  // Use webpack 5
  webpack5: true,
  webpack: (config) => {
    return config;
  }
};

module.exports = nextConfig;