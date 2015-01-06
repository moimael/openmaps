define([
'underscore',
'backbone', 
'./Location',
'./Search',
'leaflet-routing-machine',
], function(_, Backbone, Location, Search, RoutingMachine) {
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

        startRouting: function(startPoint, endPoint){
            // var dir = MQ.routing.directions().on('success', function(data) {
            //     var legs = data.route.legs,
            //       instructions;

            //     if (legs && legs.length) {
            //       instructions = legs[0].maneuvers;
            //       events.trigger("routing:completedinstructions", instructions);
            //     }
            // });

            waypoints = [
                startPoint,
                endPoint
            ]

            events.trigger("routing:completedlats", waypoints);
            // events.trigger("routing:completedinstructions", instructions);
            // $.ajax({
            //         type: 'GET',
            //         url: 'http://routes.cloudmade.com/' + '8c92938a1540489f822ce0ade39e7acc'/*this.credentials*/ + '/api/0.3/' + startPoint.lat + ',' + startPoint.lng + ',' + endPoint.lat + ',' + endPoint.lng + '/car.js',
            //         // data to be added to query string:
            //         data: { lang: 'en'/*this.language*/, units: 'km'},
            //         // type of data we are expecting in return:
            //         dataType: 'jsonp',
            //         success: function(data){
            //             var path = data.route_geometry;
            //             var instructions = data.route_instructions;
            //             var latlngs = [];
            //             for(var i = 0; i < path.length; i++){
            //                 latlngs.push(new L.LatLng(path[i]['0'], path[i]['1']));
            //             }
            //             events.trigger("routing:completedlats", latlngs);
            //             events.trigger("routing:completedinstructions", instructions);
            //         },
            //         error: function(xhr, type){
            //             console.log('Ajax error!', xhr, type);
            //         }
            //     });
        }
    });

    return Route;
  
});
