/** @type {import('next').NextConfig} */
<<<<<<< HEAD
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Proxy to Backend
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['konsta'] = path.resolve(__dirname, 'node_modules/konsta');
    return config;
  },
=======
const nextConfig = {
  reactStrictMode: true,
>>>>>>> 426d059 (first commit)
};

export default nextConfig;
