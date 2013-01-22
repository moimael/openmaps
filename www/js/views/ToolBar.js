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
                __p+='<ul>\n<li><button class="pack-icon-delete">Delete</button></li>\n</ul>\n<ul>\n<li><button class="pack-icon-move">Move</button></li>\n<li><button class="pack-icon-share">Share</button></li>\n</ul>\n';
            }
            return __p;
        },
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click .pack-icon-share': 'addDragableMarker',
            'click .pack-icon-move': 'showLayerMenu',
            'click .pack-icon-delete': 'clearMap'
        },
        
        initialize: function() {
            this.actionMenu = new ActionMenu();
            
            this.actionMenu.hideMenu();
            this.render();
            
            this.actionMenu.on('actionmenu:hide', this.show, this);
            
        },

        // Render the sidebar
        render: function() {
            //We set data-type here to avoid sidebar flicker when loading the app for the first time
            this.$el.attr('role', 'toolbar');
            this.$el.html(this.template);
        },
        
        addDragableMarker: function() {
            L.marker([50.5, 30.51], {draggable: true}).animateDragging().addTo(app.map.hasMap());
        },
        
        clearMap: function() {
            app.map.clearAll();
        },
        
        show: function() {
            this.$el.show();
        },
        
        showLayerMenu: function() {
            this.$el.hide();
            this.actionMenu.showMenu();
        }
    });
    return ToolBar;
});
