define([
'zepto',
'underscore',
'backbone',
'../common'
], function( $, _, Backbone, Common ) {
    
    var SideBar = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#sidebar',

        // Compile our route template.
        template: function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<header>\n    <menu type="toolbar">\n        <a href="#"><span class="icon icon-add">add</span></a>\n    </menu>\n    <h1>Options</h1>\n</header>\n<nav>\n    <h2>About</h2>\n    <ul>\n        <li><a href="#">Version</a></li>\n        <li><a href="#">Author</a></li>\n        <li><a href="#">Credits</a></li>\n    </ul>\n</nav>\n\n';
}
return __p;
},
        
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
