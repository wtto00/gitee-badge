/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /(\.svg|\.md)$/,
      use: ["raw-loader"],
    });

    return config;
  },
};
