# Cartes

Cartes is a FirefoxOS webapp designed to provide a map / navigation service using free data sources like OpenStreetMap.

# Technical Overview

Cartes uses the following technologies :

* [React](https://facebook.github.io/react/) as UI library
* [Flux](http://facebook.github.io/flux/) as application pattern
* [Alt](http://alt.js.org/) as Flux implementation
* [Gulp](http://gulpjs.com/) as task runner
* [npm](https://www.npmjs.com/) + [Browserify](http://browserify.org/) as dependency manager
* [Leaflet](http://leafletjs.com/) + [react-leaflet](https://github.com/PaulLeCam/react-leaflet) as map libraries
* [leaflet-routing-machine](https://github.com/perliedman/leaflet-routing-machine) + [OSRM](http://map.project-osrm.org/) as routing engine

* [Photon](https://photon.komoot.de/) as search as you type OpenStreetMap engine
* [Open MapQuest](http://open.mapquest.com/) as tiles provider

# How to contribute

```
git clone https://github.com/moimael/openmaps.git
cd openmaps
npm install
```

You can run a development server with gulp:

```
cd openmaps
gulp serve
```

View the app at http://localhost:3000/.
