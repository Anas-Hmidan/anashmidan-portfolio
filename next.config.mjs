// This file is used to configure Next.js settings.

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'MiniCssExtractPlugin'
      );
    }
    return config;
  },
}



export default nextConfig
