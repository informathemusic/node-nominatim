const Nominatim = require('..');
const Client = new Nominatim('Test for https://www.npmjs.com/package/@informath/nominatim <informathemusic@gmail.com>');

Client.search({ q: 'Adelaide, 5000, South Australia, Australia'})
  .then((v) => console.log(v));
