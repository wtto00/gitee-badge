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
        source: "/api/badge/:path*",
        destination: "/badge/:path*",
        permanent: true,
      },
      {
        source: "/api/gitee/:path*",
        destination: "/gitee/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
