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
  async redirects() {
    return [
      {
        source: "/badge/:path*",
        destination: "/api/badge/:path*",
        permanent: true,
      },
      {
        source: "/gitee/:path*",
        destination: "/api/gitee/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
