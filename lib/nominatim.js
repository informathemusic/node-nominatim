const fetch = require('node-fetch'); // Forgot the "Usage Policy" part... NotLikeThis

const { Db } = require('informa-db.js');

const queue = [];
const cache = new Db('cache.json');
const baseUrl = 'https://nominatim.openstreetmap.org/';

const NominatimNoAuth = new Proxy({}, {
  get(obj, prop) {
    return (prop == 'default' ? {
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
        uA: this.userAgent,
      })
    }))
  }
});

class Nominatim extends NominatimNoAuth {
  constructor(userAgent) {
    if (!userAgent) throw new Error('');
    this.userAgent = `"${userAgent}" Cached 1sDelay ShouldBeCompliant`;

    setInterval(async () => {
      const item = queue.shift();
      if (item) {
        cache[url] = await (await fetch(item.url)).json();
        item.fn(cache[url]);
      }
    }, 1000);
  }
}

module.exports = Nominatim;
