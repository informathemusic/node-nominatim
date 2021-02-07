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
  } : async (options, overwriteDefault) => await (
    await fetch(
      `${baseUrl}${prop}?${
        Object.entries({ ...(overwriteDefault ? {} : Nominatim.default, ...options })
          .map(([i, v]) => `${i}=${v}`)
          .join('&')
      }`
    )
  ).json())
});

module.exports = Nominatim;
