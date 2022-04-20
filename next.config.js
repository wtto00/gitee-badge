/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /(\.svg|\.md)$/,
      use: ['raw-loader'],
    });

    return config;
  },
};
