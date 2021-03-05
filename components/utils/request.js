import fetch from "node-fetch";
const HttpProxyAgent = require("http-proxy-agent");
const HttpsProxyAgent = require("https-proxy-agent");

const option =
  process.env.NODE_ENV === "development"
    ? {
        agent: url.startsWith("https://")
          ? new HttpsProxyAgent("http://127.0.0.1:12639")
          : new HttpProxyAgent("http://127.0.0.1:12639"),
      }
    : {};

export default (url, options = {}) => {
  return fetch(url, {
    ...options,
    ...option,
  });
};
