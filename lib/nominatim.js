const fetch = require('node-fetch');

const defaults = {
	addressdetails: 1,
	limit: ,
	format: 'json'
};
const baseUrl = 'https://nominatim.openstreetmap.org/'

const Nominatim = Proxy({}, {
  get: (obj, prop) => (prop == 'default' ? {
    addressdetails: 1,
    limit: 3,
    format: 'json'
  } : async (options) => await (
    await fetch(
      `${baseUrl}${prop}?${
        Object.entries({ ...Nominatim.default, ...options })
          .map(([i, v]) => `${i}=${v}`)
          .join('&')
      }`
    )
  ).json())
});

module.exports = Nominatim;
