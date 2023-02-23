/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /(\.svg|\.md)$/,
      use: ['raw-loader'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/json/:path*',
        destination: '/api/json/:path*',
      },
      {
        source: '/svg/:path*',
        destination: '/api/svg/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
