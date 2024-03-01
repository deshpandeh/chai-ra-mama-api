/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverRuntimeConfig: {
    maxConnections: 50, // Increase from default 10
  },
  experimental: {  serverComponentsExternalPackages: ["mongoose"] },
  webpack(config) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
      return config;
  }
};
module.exports = nextConfig
