define([
'zepto',
'underscore',
'backbone',
'text!../templates/sidebar.html',
'../common'
], function( $, _, Backbone, sidebarTemplate, Common ) {
    
    var SideBar = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#sidebar',

        // Compile our route template.
        template: _.template(sidebarTemplate),
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
        
        },
        
        initialize: function() {
            this.render();
        },

        // Render the sidebar
        render: function() {
        
            //We set data-type here to avoid sidebar flicker when loading the app for the first time
            this.$el.attr('data-type', 'sidebar');
            this.$el.html(this.template);
        }
    });
    return SideBar;
});
