define([
'zepto',
'underscore',
'backbone',
'../common'
], function( $, _, Backbone, Common ) {
    
    var ActionMenu = Backbone.View.extend({
        //TODO: change ui, add a clear layer button
        
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-menu',

        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<form onsubmit="return false;" data-type="action" role="dialog">\n<header>Layers</header>\n<menu>\n<button id="map-view-button">Map</button>\n<button id="satellite-view-button">Satellite</button>\n<button id="cycle-view-button">Cycle</button>\n<button id="offline-view-button">Offline</button>\n<button id="cancel-button">Cancel</button>\n</menu>\n</form>\n';
            }
            return __p;
        },
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click #map-view-button': 'showMapLayer',
            'click #satellite-view-button': 'showSatelliteLayer',
            'click #cycle-view-button': 'showCycleLayer',
            'click #offline-view-button': 'showOfflineLayer',
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
        },
        
        showOfflineLayer: function() {
            events.trigger('actionmenu:offlinelayer');
            this.hideMenu();
        }
        
    });
    return ActionMenu;
});
