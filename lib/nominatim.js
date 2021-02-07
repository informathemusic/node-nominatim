const fetch = require('node-fetch'), // Forgot the "Usage Policy" part... NotLikeThis
  TQueue = require('tqueue');

const queue = new TQueue({delay: 1000});
const baseUrl = 'https://nominatim.openstreetmap.org/';

queue.on('pop', async (item) => {  
  item.fn(await (await fetch(item.url)).json());
});

const Nominatim = Proxy({}, {
  get: (obj, prop) => (prop == 'default' ? {
    addressdetails: 1,
    limit: 10,
    format: 'json'
  } : (options, overwriteDefault) => return new Promise((res) => queue.push({
    url: `${baseUrl}${prop}?${
      Object.entries({ ...(overwriteDefault ? {} : Nominatim.default, ...options })
        .map(([i, v]) => `${i}=${v}`)
        .join('&')
    }`,
    fn: res,
  }))
});

module.exports = Nominatim;
