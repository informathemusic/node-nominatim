const fetch = require('node-fetch'); // Forgot the "Usage Policy" part... NotLikeThis

const { Db } = require('informa-db.js');

const cache = new Db('cache.json', {
  saveSpace: true,
});
const baseUrl = 'https://nominatim.openstreetmap.org/';

class Nominatim {
  constructor(userAgent) {
    if (!userAgent) throw new Error('Please invoke me with an user agent');
    if (!userAgent.includes('@')) throw new Error('Please include contact info in user agent in case your app goes out of control');
    userAgent = `"${userAgent}" Cached 1sDelay ShouldBeCompliant https://www.npmjs.com/package/@informath/nominatim`;
    const queue = [];

    setInterval(async () => {
      const item = queue.shift();
      if (item) {
        console.log(item);
        cache[item.url] = await (await fetch(item.url, {
          headers: {
            'User-Agent': userAgent,
          }
        })).json();
        item.fn(cache[item.url]);
      }
    }, 1000);
    return new Proxy({
      default: {
        addressdetails: 1,
        limit: 10,
        format: 'json',
      },
    }, {
      get(obj, prop) {
        return (prop === 'default' ? obj.default : ((options, overwriteDefault) => new Promise((res) => {
          const url = `${baseUrl}${prop}?${
            Object.entries({ ...(overwriteDefault ? {} : obj.default), ...options })
              .map(([i, v]) => `${i}=${encodeURIComponent(v)}`)
              .join('&')
          }`;
          if (url in cache) res(cache[url]);
          queue.push({
            url,
            fn: res,
            uA: userAgent,
          })
        })))
      },
      set(obj, prop, value) {
        if (prop === 'default') obj[prop] = value;
      }
    });
  }
}

module.exports = Nominatim;
