define([
'zepto',
'underscore',
'backbone',
'../models/Search',
'../models/Route',
'text!../templates/route-header.html',
'../common'
], function( $, _, Backbone, Search, Route, routeTemplate, Common ) {
    
    var ActionBarRoute = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-bar',

        // Compile our route template.
        template: _.template(routeTemplate),
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click #search-button': 'showSearchView',
            'keypress #end-input': 'search',
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.locations = [];
            this.find = new Search();
            this.find.setCredentials('fTGKVi5e');
            this.route = new Route();
        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function() {
            this.$el.html(this.template());
            this.btnRoute = this.$('#route-button');
            this.startInput = this.$('#start-input');
            this.endInput = this.$('#end-input');
            this.btnMenu = this.$('#menu-button');
        },
        
        
        search: function(e) {
            if ( e.which !== Common.ENTER_KEY || !this.startInput.val().trim() || !this.endInput.val().trim()) {
                return;
            }
            
            this.find.findLocation(this.startInput.val(), (function(scope){
                return function(data) {
                    var results = data.ResultSet.Results;
                    var lat = results[0].latitude;
                    var lng = results[0].longitude;
                    var latlng = new L.LatLng(lat, lng);
                    scope.locations.push(latlng);
                    
                    if(scope.locations.length === 2){
                        scope.route.startRouting(locations[0], locations[1]);
                        scope.locations = [];
                    }
                }
            })(this));
        
            this.find.findLocation(this.endInput.val(), (function(scope){
                return function(data) {
                    var results = data.ResultSet.Results;
                    var lat = results[0].latitude;
                    var lng = results[0].longitude;
                    var latlng = new L.LatLng(lat, lng);
                    scope.locations.push(latlng);
                    
                    if(scope.locations.length === 2){
                        scope.route.startRouting(scope.locations[0], scope.locations[1]);
                        scope.locations = [];
                    }
                }
            })(this));
        },
        
        showSearchView: function() {
            events.trigger('actionbarroute:showsearchview');
            //css transform to resize search field
        }
    });
    return ActionBarRoute;
});
