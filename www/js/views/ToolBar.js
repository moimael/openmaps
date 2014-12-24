define([
'zepto',
'underscore',
'backbone',
'./ActionMenu',
'../common'
], function( $, _, Backbone, ActionMenu, Common ) {
    
    var ToolBar = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#toolbar',

        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<ul><li><button id="toggle-search-button" class="pack-icon-route"></button></li>\n</ul>\n<ul>\n<li><button class="pack-icon-layers"></button></li>\n<li><button class="pack-icon-location"></button></li>\n</ul>';
            }
            return __p;
        },
        //<li><button class="pack-icon-marker"></button></li>\n
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            // 'click .pack-icon-marker': 'addDragableMarker',
            'click .pack-icon-layers': 'showLayerMenu',
            'click #toggle-search-button': 'toggleSearchView',
            'click .pack-icon-location': 'locate'
        },
        
        initialize: function() {
            this.actionMenu = new ActionMenu();
            
            this.actionMenu.hideMenu();
            this.render();
            
            events.on('actionmenu:hide', this.show, this);
            
        },

        // Render the sidebar
        render: function() {
            //We set data-type here to avoid sidebar flicker when loading the app for the first time
            this.$el.attr('role', 'toolbar');
            this.$el.html(this.template);
            this.toggleSearchButton = this.$('#toggle-search-button');
        },
        
        addDragableMarker: function() {
            L.marker([50.5, 30.51], {draggable: true}).animateDragging().addTo(app.map.hasMap());
        },
        
//        clearMap: function() {
//            app.map.clearAll();
//        },
        toggleSearchView: function() {
            this.toggleSearchButton.toggleClass('pack-icon-search');
            this.toggleSearchButton.toggleClass('pack-icon-route');
            events.trigger('toolbar:togglesearchview');
            //css transform to resize search field
        },
        
        show: function() {
            this.$el.show();
        },
        
        showLayerMenu: function() {
            this.$el.hide();
            this.actionMenu.showMenu();
        },
        
        locate: function() {
            events.trigger('toolbar:locate');
        }
    });
    return ToolBar;
});
