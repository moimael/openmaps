var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Locations = require('../collections/Locations');
var WayPoints = require('../collections/WayPoints');
var Route = require('../models/Route');
var Common = require('../common');


var ActionBarRoute = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#action-bar',

    // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
    // It is also much quicker to load this way.
    template: function(obj){
        var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
        with(obj||{}){
            // <menu type="toolbar">\n<button id="instructions-list-button" disabled="disabled"><span class="icon icon-menu">edit</span></button>\n</menu>\n
            __p+='<form action="#">\n<p><input id="start-input" type="text" placeholder="From"><button type="reset">Clear</button></p>\n<p><input id="end-input" type="text" placeholder="To"><button type="reset"></button></p>\n</form>\n';
        }
        return __p;
    },

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'click #instructions-list-button' : 'showInstructionsPane',
        'keyup #start-input, #end-input': 'searchPlace',
        'keypress #end-input': 'route'
    },
    
    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
        this.jqXHR = null;
        this.route = new Route();
        this.waypoints = WayPoints;
        events.on('routing:search:completed', this.addWayPoint, this);
    },

    render: function() {
        this.$el.html(this.template());
        this.btnRoute = this.$('#route-button');
        this.startInput = this.$('#start-input');
        this.endInput = this.$('#end-input');
        this.btnMenu = this.$('#menu-button');
    },
    

    searchPlace: function(e) {
        var locations = Locations;

        var search_params = {
            'q': $(e.target).val(),
            'limit': '8'
        };

        // Abort current request if another one was launched in the mean time
        if (this.jqXHR !== null) {
            this.jqXHR.abort();
        }

        this.jqXHR = locations.fetch({
            reset: true,
            data: $.param(search_params)
        });
    },

    addWayPoint: function(model) {
        this.waypoints.add(model);
    },

    route: function(e) {
        if ( e.which !== Common.ENTER_KEY || !this.startInput.val().trim() || !this.endInput.val().trim()) {
            return;
        }

        this.route.startRouting(self.locations[0], self.locations[1]);
        // self = this;
        // this.find.findLocation(this.startInput.val(), function(data){
        //         var results = data.results[0].locations;
        //         var lat = results[0].latLng.lat;
        //         var lng = results[0].latLng.lng;
        //         var latlng = new L.LatLng(lat, lng);
        //         self.locations.push(latlng);
                
        //         if(self.locations.length === 2){
        //             self.route.startRouting(self.locations[0], self.locations[1]);
        //             self.locations = [];
        //         }
        // });
    
        // this.find.findLocation(this.endInput.val(), function(data){
        //         var results = data.results[0].locations;
        //         var lat = results[0].latLng.lat;
        //         var lng = results[0].latLng.lng;
        //         var latlng = new L.LatLng(lat, lng);
        //         self.locations.push(latlng);
                
        //         if(self.locations.length === 2){
        //             self.route.startRouting(self.locations[0], self.locations[1]);
        //             self.locations = [];
        //         }
        // });
    },
    
    showInstructionsPane: function() {
        events.trigger('actionbarroute:showinstructionspane');
    }
});

module.exports = ActionBarRoute;
