import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    
  },
  //outputFileTracingRoot: path.join(__dirname, '../../'),
  images: {
    domains: [
      'lh3.googleusercontent.com', // Домен для Google аватарок
      'avatars.githubusercontent.com', // Домен для GitHub аватарок (опціонально)
      'cdn.discordapp.com', // Домен для Discord аватарок (опціонально)
    ],
  },
};

export default nextConfig;
