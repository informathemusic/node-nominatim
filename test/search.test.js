var nominatim = require('..');

nominatim.search({ q: 'Adelaide, 5000, South Australia, Australia'}, true)
  .then((v) => console.log(v));
