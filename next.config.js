const path = require("path");
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /(\.svg|\.md)$/,
      use: ["raw-loader"]
    });
    config.resolve.alias["components"] = path.join(__dirname, "components");

    return config;
  }
});
