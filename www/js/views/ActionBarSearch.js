define([
'zepto',
'underscore',
'backbone',
'jquery.autoSuggest',
'../models/Search',
'../models/Location',
'text!../templates/search-header.html',
'../common'
], function( $, _, Backbone, AutoComplete, Search, Location, searchTemplate, Common ) {
    
    var ActionBarSearch = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-bar',

        // Compile our search template.
        template: _.template(searchTemplate),
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
//            'click #menu-button': 'showMenu',
            'click #locate-button': 'locate',
            'click #route-button': 'route',
            'keypress #search-input': 'searchPlace',
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.find = new Search();
            this.find.setCredentials('fTGKVi5e');
        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function() {
            this.$el.html(this.template());
            this.btnLocate = this.$('#locate-button');
            this.btnRoute = this.$('#route-button');
            this.searchInput = this.$('#search-input');
            this.btnMenu = this.$('#menu-button');
            
//            this.searchInput.autoSuggest('http://where.yahooapis.com/geocode', {
//                minChars: 2,
//                queryParam: 'location',
//                extraParams: '&flags=J&appid=fTGKVi5e', 
//                retrieveComplete: function(data){ 
//                    var results = data.ResultSet.Results;
//                    console.log(results);
//                    var test = [];
//                    for(var i = 0; i < results.length; i++){
//                        test.push({"value": results[i].city});
//                    }

//                    return test; 
//                }
//            });
//            this.searchInput.autocomplete({
//                serviceUrl: 'http://where.yahooapis.com/geocode',
//                params: {
//                    flags: 'J',
//                    appid: 'fTGKVi5e'
//                },
//                onSelect: function (suggestion) {
//                    alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
//                },
//                onSearchComplete: function (query) {
//                    console.log(query);
//                }
//            });

//            this.searchInput.autocomplete('http://where.yahooapis.com/geocode', {
//                extraParams: {
//                    flags: 'J',
//                    appid: 'fTGKVi5e'
//                }
//            });
        },

        searchPlace: function(e) {
            if ( e.which !== Common.ENTER_KEY || !this.searchInput.val().trim() ) {
                return;
            }
            this.find.findLocation(this.searchInput.val(), function(data){
                    var results = data.ResultSet.Results;

                    var locationProperties = new Location({
                        lat: results[0].latitude,
                        lng: results[0].longitude,
                        city: results[0].city,
                        country: results[0].country,
                        county: results[0].county,
                        countycode: results[0].countycode,
                        state: results[0].state,
                        uzip: results[0].uzip
                    });
                    events.trigger("search:completed", locationProperties);
                });
        },
        
        locate: function() {
            events.trigger('actionbarsearch:locate');
        },
        
        route: function() {
            events.trigger('actionbarsearch:showrouteview');
        }
    });
    return ActionBarSearch;
});
