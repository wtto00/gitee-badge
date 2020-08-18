const redis = require("redis");
var Q = require("bluebird");

Q.promisifyAll(redis.RedisClient.prototype);
Q.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
});

client.on("error", function (error) {
  console.error(error);
});

export default client;