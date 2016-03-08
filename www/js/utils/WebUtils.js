import $ from 'jquery';
var jqXHR = null;

export default {
  search(searchText, boundsCenter) {
    let search_params = {
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
    let search_params = {
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
    let parsed = {
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
};
