import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  },
  images: {
    domains: [
      'lh3.googleusercontent.com', // Домен для Google аватарок
      'avatars.githubusercontent.com', // Домен для GitHub аватарок (опціонально)
      'cdn.discordapp.com', // Домен для Discord аватарок (опціонально)
    ],
  },
};

export default nextConfig;
