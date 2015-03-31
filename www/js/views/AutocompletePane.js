var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Common = require('../common');
var Locations = require('../collections/Locations');
var AutocompleteItem = require('./AutocompleteItem');


var AutocompletePane = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#autocomplete-pane',

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
        this.autocompleteList = this.$('#autocomplete-list');
        this.container = document.createDocumentFragment();
        Locations.on("all", this.render, this);
    },

    renderItem: function(model){
        var autocompleteItem = new AutocompleteItem({model: model});
        autocompleteItem.render();
        this.container.appendChild(autocompleteItem.el);
        // this.$el.append(autocompleteItem.el);
    },

    render: function() {
        if (Locations.length !== 0) {
            this.show();
            this.autocompleteList.html("");
            Locations.each(this.renderItem, this);
            this.autocompleteList.append(this.container);
        } else {
            this.hide();
        }
    },
    
    show: function() {
        this.$el.show();
    },

    hide: function() {
        this.$el.hide();
    }
});

module.exports = AutocompletePane;
