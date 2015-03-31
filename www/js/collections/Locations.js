var _ = require('underscore');
var Backbone = require('backbone');
var Location = require('../models/Location');

var Locations = Backbone.Collection.extend({

  model: Location,

  url: function() {
    return 'https://photon.komoot.de' + '/api/';
  },

  parse: function(response) {
    return response.features;
  }

});

module.exports = new Locations();