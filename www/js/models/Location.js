var _ = require('underscore');
var Backbone = require('backbone');

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

module.exports = Location;

