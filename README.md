## Nominatim

# DISCLAIMER

This is a fully rewritten version, do not expect to be using that one just by replacing the original library with this one

===

_nominatim_ is a basic node module to handle geocoding and reverse geocoding via [OpenStreetMap](http://openstreetmap.org/) (OSM). It attempts to adhere to the [Nominatim usage policy](http://wiki.openstreetmap.org/wiki/Nominatim_usage_policy).

## Example

```js
const Nominatim = require('@informath/nominatim');

const NominatimClient = new Nominatim('Nelson\'s Obvious tracking (NO tracking) <nelson.bighetti@hooli.xyz>');

NominatimClient.search('5230, Newell Road, Palo Alto')
  .then((v) => {
    console.log(v);
  });
```

## Installation

```bash
$ npm install @informath/nominatim
```

## How to use?

`await NominatimClient[operationToPerform](options, overwriteOptions)`

`options` will be merged with `Nominatim.default` unless `overwriteOptions` is truthy

## What are the possible endpoints?

Any!

It will make a request at `https://nominatim.openstreetmap.org/[[Your operation here!]]`

Learn more about proxy magic [here](https://medium.com/@alonronin/magic-methods-in-javascript-meet-proxy-65e6305f4d3e)! (Literally a google search I just made)
