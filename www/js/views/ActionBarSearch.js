define([
'zepto',
'underscore',
'backbone',
'../models/Search',
'../models/Location',
'../common'
], function( $, _, Backbone, Search, Location, Common ) {
    
    var ActionBarSearch = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-bar',

        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<form action="#">\n<input id="search-input" type="text" required="required" placeholder="Enter search terms">\n<button type="reset">Remove text</button>\n</form>\n';
            }
            return __p;
        },
        //<a href="#"><span class="icon icon-menu">hide sidebar</span></a>\n<a href="#drawer"><span class="icon icon-menu">show sidebar</span></a>\n
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'keypress #search-input': 'searchPlace'
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.find = new Search();
            this.find.setCredentials('Fmjtd|luub2duan9%2C8a%3Do5-9u2llr');
        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function() {
            this.$el.html(this.template());
            this.searchInput = this.$('#search-input');
        },

        searchPlace: function(e) {
            if ( e.which !== Common.ENTER_KEY || !this.searchInput.val().trim() ) {
                return;
            }
            this.find.findLocation(this.searchInput.val(), function(data){
                    var results = data.results[0].locations;

                    var locationProperties = new Location({
                        lat: results[0].latLng.lat,
                        lng: results[0].latLng.lng,
                        city: results[0].adminArea5,
                        country: results[0].adminArea1,
                        county: results[0].adminArea4,
//                        countycode: results[0].countycode,
                        state: results[0].adminArea3,
                        uzip: results[0].postalCode
                    });
                    events.trigger("search:completed", locationProperties);
                });
        }
    });
    return ActionBarSearch;
});
