var $ = require('jquery');
var jqXHR = null;

module.exports = {
  search(searchText) {
    // var paramsString = "q=searchText&limit=8"
    // var searchParams = new URLSearchParams(paramsString);
    // fetch('https://photon.komoot.de' + '/api/', {body: searchParams}).then(function(response) {
    //   console.log(response);
    //   response.json().then(function(data) {
    //     console.log(data);
    //     return this.parse(data);
    //   }.bind(this));
    // }.bind(this));

    if ( !searchText ) {
      return;
    }

    var search_params = {
      'q': searchText,
      'limit': '8'
    };

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

  parse(response) {
    var parsed = {
      'id': response.properties.osm_id,
      'type': response.geometry.type,
      'name': response.properties.name,
      'lat': response.geometry.coordinates[1],
      'lng': response.geometry.coordinates[0],
      'state': response.properties.state,
      'country': response.properties.country
    };
    return parsed;
  }
}