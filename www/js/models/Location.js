var _ = require('underscore');
var Backbone = require('backbone');

var Location = Backbone.Model.extend({
    defaults: {
        lat: "",
        lng: "",
        city: "",
        country: "",
        county: "",
        countycode: "",
        state: "",
        uzip: ""
    }
});

module.exports = Location;

