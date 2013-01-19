define([
'underscore',
'backbone', 
'./Location',
'./Search'
], function(_, Backbone, Location, Search) {
//network info api
//var connection = window.navigator.mozConnection, online = connection.bandwidth > 0, offline = ...
    var Route = Backbone.Model.extend({
        defaults: {
            credentials: '8c92938a1540489f822ce0ade39e7acc',
            language: "fr",
            locations: []
        },
        
        getCredentials: function() {
            return this.credentials;
        },
        
        setCredentials: function(credentials) {
            this.credentials = credentials;
        },
        
        validate: function(attrs) {
            if ( _.isEmpty(attrs.credentials) ) {
                return "Missing Credentials";
            }
        },

        gotRouting: function(inSender, inResponse) {
            this.path = inResponse.route_geometry;
            this.instructions = inResponse.route_instructions;
            var latlngs = [];
            var i;
            for(i = 0; i < this.path.length; i++){
                latlngs.push(new L.LatLng(this.path[i]['0'], this.path[i]['1']));
            }
//            this.doRoutingSuccess(latlngs, this.instructions);
        },

        gotRoutingFailure: function(inSender, inResponse) {
//            this.doRoutingFailure();
        },

        startRouting: function(startPoint, endPoint){
//            $.getJSON('http://routes.cloudmade.com/' + '8c92938a1540489f822ce0ade39e7acc'/*this.credentials*/ + '/api/0.3/' + startPoint.lat + ',' + startPoint.lng + ',' + endPoint.lat + ',' + endPoint.lng + '/car.js?lang=fr&units=km', function(data){
//                    console.log("test");});
            $.ajax({
                    type: 'GET',
                    url: 'http://routes.cloudmade.com/' + '8c92938a1540489f822ce0ade39e7acc'/*this.credentials*/ + '/api/0.3/' + startPoint.lat + ',' + startPoint.lng + ',' + endPoint.lat + ',' + endPoint.lng + '/car.js',
                    // data to be added to query string:
                    data: { lang: 'fr'/*this.language*/, units: 'km'},
                    // type of data we are expecting in return:
                    dataType: 'jsonp',
                    success: function(data){
                        var path = data.route_geometry;
                        var instructions = data.route_instructions;
                        var latlngs = [];
                        var i;
                        for(i = 0; i < path.length; i++){
                            latlngs.push(new L.LatLng(path[i]['0'], path[i]['1']));
                        }

                        events.trigger("routing:completedlats", latlngs);
                        events.trigger("routing:completedinstructions", instructions);
                    },
                    error: function(xhr, type){
                        console.log('Ajax error!', xhr, type);
                    }
                });
        }
    });

    return Route;
  
});
