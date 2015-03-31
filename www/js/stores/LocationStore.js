'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var Location = Backbone.Model.extend({
    defaults: {
        type: "",
        name: "",
        lat: "",
        lng: "",
        city: "",
        country: "",
        county: "",
        countycode: "",
        state: "",
        uzip: ""
    },

    parse: function(response) {
        var parsed = {
            'type': response.geometry.type,
            'name': response.properties.name,
            'lat': response.geometry.coordinates[1],
            'lng': response.geometry.coordinates[0],
            'state': response.properties.state,
            'country': response.properties.country,
        };
        return parsed;
    }
});

var LocationCollection = Backbone.Collection.extend({

  model: Location,

  url: function() {
    return 'https://photon.komoot.de' + '/api/';
  },

  initialize: function() {
    return this.dispatchToken = AppDispatcher.register(this.dispatchCallback);
  },

  parse: function(response) {
    return response.features;
  },

  dispatchCallback: function(payload) {
      switch (payload.actionType) {
        case "location-delete":
          return this.remove(payload.location);
        case "location-add":
          return this.add(payload.location);
        case "location-update":
          return this.add(payload.location, {
            merge: true
          });
      }
  }.bind(this)
});

var LocationStore = new LocationCollection();

module.exports = LocationStore;
