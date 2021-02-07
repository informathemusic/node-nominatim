const fetch = require('node-fetch'), // Forgot the "Usage Policy" part... NotLikeThis
  TQueue = require('tqueue');

const Db = require('informa-db.js');

const queue = new TQueue({delay: 1000});
const cache = new Db('cache.json');
const baseUrl = 'https://nominatim.openstreetmap.org/';

queue.on('pop', async (item) => {
  cache[url] = await (await fetch(item.url)).json();
  item.fn(cache[url]);
});

const Nominatim = new Proxy({}, {
  get: (obj, prop) => (prop == 'default' ? {
    addressdetails: 1,
    limit: 10,
    format: 'json'
  } : (options, overwriteDefault) => new Promise((res) => {
    const url = `${baseUrl}${prop}?${
      Object.entries({ ...(overwriteDefault ? {} : Nominatim.default), ...options })
        .map(([i, v]) => `${i}=${v}`)
        .join('&')
    }`;
    if (url in cache) res(cache[url]);
    queue.push({
      url,
      fn: res,
    })
  }))
});

module.exports = Nominatim;
