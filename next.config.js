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
};

module.exports = nextConfig;
