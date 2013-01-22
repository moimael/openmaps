define([
'zepto',
'underscore',
'backbone',
'../models/Search',
'../models/Route',
'../common'
], function( $, _, Backbone, Search, Route, Common ) {
    
    var ActionBarRoute = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-bar',

        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<a href="#"><span class="icon icon-menu">hide sidebar</span></a>\n<a href="#drawer"><span class="icon icon-menu">show sidebar</span></a>\n<menu type="toolbar">\n<button id="search-button"><span class="icon icon-search">edit</span></button>\n</menu>\n<form action="#">\n<input id="start-input" type="text" required="required" placeholder="From">\n<!--<button type="reset">Remove text</button>-->\n<input id="end-input" type="text" required="required" placeholder="To">\n<!--<button type="reset">Remove text</button>-->\n</form>\n';
            }
            return __p;
        },
        
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
            
            self = this;
            this.find.findLocation(this.startInput.val(), function(data){
                    var results = data.ResultSet.Results;
                    var lat = results[0].latitude;
                    var lng = results[0].longitude;
                    var latlng = new L.LatLng(lat, lng);
                    self.locations.push(latlng);
                    
                    if(self.locations.length === 2){
                        self.route.startRouting(self.locations[0], self.locations[1]);
                        self.locations = [];
                    }
            });
        
            this.find.findLocation(this.endInput.val(), function(data){
                    var results = data.ResultSet.Results;
                    var lat = results[0].latitude;
                    var lng = results[0].longitude;
                    var latlng = new L.LatLng(lat, lng);
                    self.locations.push(latlng);
                    
                    if(self.locations.length === 2){
                        self.route.startRouting(self.locations[0], self.locations[1]);
                        self.locations = [];
                    }
            });
        },
        
        showSearchView: function() {
            events.trigger('actionbarroute:showsearchview');
            //css transform to resize search field
        }
    });
    return ActionBarRoute;
});
