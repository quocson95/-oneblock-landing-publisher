import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  images: {
    // formats: ["image/avif", "image/webp", "image/png", "image/jpeg"],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'api.oneblock.vn',
      port: '',
      pathname: '/be/s3/**'
    }],
  },
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },
  //  compress
  compress: true,
  allowedDevOrigins: ['103.82.133.178'],
};

export default nextConfig;
