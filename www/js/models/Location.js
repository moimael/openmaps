define([
'underscore',
'backbone'
], function(_, Backbone) {

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
        },
        
        validate: function(attrs) {
            if ( _.isEmpty(attrs.lat) || _.isEmpty(attrs.lng)) {
                return "Missing Coordinates";
            }
        }

    });

    return Location;
  
});
