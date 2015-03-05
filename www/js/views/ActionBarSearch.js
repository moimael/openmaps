var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Location = require('../models/Location');
var Locations = require('../collections/Locations');
var Common = require('../common');


var ActionBarSearch = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#action-bar',

    // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
    // It is also much quicker to load this way.
    template: function(obj){
        var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
        with(obj||{}){
            __p+='<form action="#">\n<p>\n<input id="search-input" type="text" placeholder="Enter search terms">\n<button id="clear-btn" type="reset">Clear</button>\n</p>\n</form>\n';
        }
        return __p;
    },

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'keyup #search-input': 'searchPlace'
    },
    
    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
        this.jqXHR = null;
    },

    // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
    render: function() {
        this.$el.html(this.template());
        this.searchInput = this.$('#search-input');
    },

    searchPlace: function(e) {

        if ( !this.searchInput.val().trim() ) {
            // Hide autocomplete if no text to search
            $('#autocomplete-pane').hide();
            return;
        }

        var locations = Locations;

        var search_params = {
            'q': this.searchInput.val(),
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
    }
});

module.exports = ActionBarSearch;

