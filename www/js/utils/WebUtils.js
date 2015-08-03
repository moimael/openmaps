var $ = require('jquery');
var jqXHR = null;

module.exports = {
  search(searchText, boundsCenter) {
    // var paramsString = "q=searchText&limit=8"
    // var searchParams = new URLSearchParams(paramsString);
    // fetch('https://photon.komoot.de' + '/api/', {body: searchParams}).then(function(response) {
    //   console.log(response);
    //   response.json().then(function(data) {
    //     console.log(data);
    //     return this.parse(data);
    //   }.bind(this));
    // }.bind(this));

    var search_params = {
      'q': searchText,
      'limit': '8'
    };

    if (boundsCenter) {
      search_params.lon = boundsCenter.lng;
      search_params.lat = boundsCenter.lat;
    }

    // Abort current request if another one was launched in the mean time
    if (jqXHR !== null) {
      jqXHR.abort();
    }

    jqXHR = $.getJSON(
      'https://photon.komoot.de' + '/api/',
      search_params
    );
    return jqXHR.done();
  },

  reverseGeocode(latlng) {
    var search_params = {
      'lon': latlng.lng,
      'lat': latlng.lat,
      'limit': '8'
    };

    // Abort current request if another one was launched in the mean time
    if (jqXHR !== null) {
      jqXHR.abort();
    }

    jqXHR = $.getJSON(
      'https://photon.komoot.de' + '/reverse',
      search_params
    );
    return jqXHR.done();
  },

  parse(response) {
    var parsed = {
      'id': response.properties.osm_id,
      'type': response.geometry.type,
      'name': response.properties.name,
      'street': response.properties.street,
      'housenumber': response.properties.housenumber,
      'postcode': response.properties.postcode,
      'city': response.properties.city,
      'latlng': {
        'lat': response.geometry.coordinates[1],
        'lng': response.geometry.coordinates[0]
      },
      'state': response.properties.state,
      'country': response.properties.country
    };
    return parsed;
  }
}
