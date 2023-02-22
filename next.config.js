/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /(\.svg|\.md)$/,
      use: ["raw-loader"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/badge/:path*",
        destination: "/api/badge/:path*",
      },
      {
        source: "/gitee/:path*",
        destination: "/api/gitee/:path*",
      },
      {
        source: "/github/:path*",
        destination: "/api/github/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
