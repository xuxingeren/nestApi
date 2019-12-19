import redis = require('redis');
import util = require('util');

const client = redis.createClient('6379');

client.on('connect', () => {
  console.log('redis connect');
});

client.on('error', (error) => {
  console.log('redis error:' + error);
});

const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);
const delAsync = util.promisify(client.del).bind(client);
const expireAsync = util.promisify(client.expire).bind(client);

export {
  client,
  getAsync,
  setAsync,
  delAsync,
  expireAsync,
};
