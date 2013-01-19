define([
'zepto',
'underscore',
'backbone',
'text!../templates/action-menu.html',
'../common'
], function( $, _, Backbone, actionmenuTemplate, Common ) {
    
    var ActionMenu = Backbone.View.extend({
        //TODO: change ui, add a clear layer button
        
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-menu',

        // Compile our route template.
        template: _.template(actionmenuTemplate),
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click #map-view-button': 'showMapLayer',
            'click #satellite-view-button': 'showSatelliteLayer',
            'click #cycle-view-button': 'showCycleLayer',
            'click #cancel-button': 'hideMenu'
        },
        
        initialize: function() {
            this.render();
        },

        // Render the sidebar
        render: function() {
            this.$el.html(this.template);
        },
        
        showMenu: function() {
            this.$el.show();
        },
        
        hideMenu: function() {
            this.$el.hide();
            this.trigger('actionmenu:hide');
        },
        
        showMapLayer: function() {
            events.trigger('actionmenu:maplayer', 'road');
            this.hideMenu();
        },
        
        showSatelliteLayer: function() {
            events.trigger('actionmenu:satellitelayer', 'satellite');
            this.hideMenu();
        },
        
        showCycleLayer: function() {
            events.trigger('actionmenu:cyclelayer');
            this.hideMenu();
        }
        
    });
    return ActionMenu;
});
