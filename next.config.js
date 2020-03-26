const path = require("path");

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /(\.svg|\.md)$/,
      use: ["raw-loader"]
    });
    config.resolve.alias["components"] = path.join(__dirname, "components");

    return config;
  }
};
