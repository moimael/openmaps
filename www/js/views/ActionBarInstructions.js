define([
'zepto',
'underscore',
'backbone',
'text!../templates/instructions-header.html',
'../common'
], function( $, _, Backbone, instructionsTemplate, Common ) {
    
    var ActionBarInstructions = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-bar',

        // Compile our search template.
        template: _.template(instructionsTemplate),
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click #back-button': 'goBack'
//            'click #route-button': 'route',
//            'keypress #search-input': 'searchPlace',
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {

        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function() {
            this.$el.html(this.template());
//            this.btnLocate = this.$('#locate-button');
//            this.btnRoute = this.$('#route-button');
//            this.searchInput = this.$('#search-input');
//            this.btnMenu = this.$('#menu-button');
        },
        
        goBack:function() {
            events.trigger('actionbarinstructions:back');
        }
    });
    return ActionBarInstructions;
});
