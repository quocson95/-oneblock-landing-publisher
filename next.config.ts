import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};


module.exports = {
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
   //  compress
   compress: true,
   allowedDevOrigins: ['103.82.133.178'],
};

export default nextConfig;
