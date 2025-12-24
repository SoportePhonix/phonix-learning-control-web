import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // HTTP Client
      {
        protocol: (process.env.PROTOCOL as 'http' | 'https') || 'http',
        hostname: process.env.HOSTNAME_CLIENT || '127.0.0.1',
        port: process.env.NODE_ENV === 'development' ? process.env.HOSTNAME_CLIENT_PORT || '3000' : '',
      },
      // HTTP Server
      {
        protocol: (process.env.PROTOCOL as 'http' | 'https') || 'http',
        hostname: process.env.HOSTNAME_SERVER || '127.0.0.1',
        port: process.env.NODE_ENV === 'development' ? process.env.HOSTNAME_SERVER_PORT || '8000' : '',
      },
      // HTTPS Client (producción)
      ...(process.env.HOSTNAME_CLIENT
        ? [
            {
              protocol: 'https' as const,
              hostname: process.env.HOSTNAME_CLIENT,
              port: '',
            },
          ]
        : []),
      // HTTPS Server (producción)
      ...(process.env.HOSTNAME_SERVER
        ? [
            {
              protocol: 'https' as const,
              hostname: process.env.HOSTNAME_SERVER,
              port: '',
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
