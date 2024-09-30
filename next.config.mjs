// next.config.mjs

import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Add this to ignore certain warnings
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /node_modules\/node-fetch\/lib\/index\.js/ },
    ];

    // Resolve __dirname in ESM
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        __dirname: fileURLToPath(new URL('.', import.meta.url)),
      };
    }

    return config;
  },
};

export default nextConfig;