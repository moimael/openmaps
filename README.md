# Cartes

Cartes is a FirefoxOS webapp designed to provide a map / navigation service using free data sources like OpenStreetMap.

A few screenshots :

![capture d ecran 2015-09-17 a 16 33 29](https://cloud.githubusercontent.com/assets/1479859/9936132/cb94dc9c-5d5a-11e5-8997-fc6a18f1aa69.png)
![capture d ecran 2015-09-17 a 16 33 40](https://cloud.githubusercontent.com/assets/1479859/9936016/40b03bf8-5d5a-11e5-91c5-e5b217247208.png)
![capture d ecran 2015-09-17 a 16 34 00](https://cloud.githubusercontent.com/assets/1479859/9936022/43c37684-5d5a-11e5-9dc7-0746f46d9b39.png)
![capture d ecran 2015-09-17 a 16 34 06](https://cloud.githubusercontent.com/assets/1479859/9936024/45cc4104-5d5a-11e5-900c-d87c7566abec.png)
![capture d ecran 2015-09-17 a 16 34 14](https://cloud.githubusercontent.com/assets/1479859/9936029/4acc540a-5d5a-11e5-882d-7b268f2eddf3.png)
![capture d ecran 2015-09-17 a 16 34 24](https://cloud.githubusercontent.com/assets/1479859/9936035/4d9f809e-5d5a-11e5-89e9-9b9e8eafe5e4.png)
![capture d ecran 2015-09-17 a 16 37 52](https://cloud.githubusercontent.com/assets/1479859/9936070/76f5a2b6-5d5a-11e5-9db8-dcc8ac00bac7.png)

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
