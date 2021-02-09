var nominatim = require('..');

console.log(process.env);

nominatim.search({ q: 'Adelaide, 5000, South Australia, Australia' }).then((results) => {
  var item = results.data[0];
  console.log(results);
  nominatim.reverse({ lat: item.lat, lon: item.lon }).then((resultsRev) => {
    console.log(resultsRev);
  });
});
