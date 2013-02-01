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
        }
    });

    return Location;
  
});
