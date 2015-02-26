define([
'zepto',
'underscore',
'backbone',
'../common'
], function( $, _, Backbone, Common ) {
    
    var AutocompletePane = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#autocomplete-pane',
        
        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<li><p>'+
                ((__t=( name ))==null?'':__t)+
                '</p><p>'+
                ((__t=( state ))==null?'':__t)+
                ', '+
                ((__t=( country ))==null?'':__t)+
                '</p></li>';
            }
            return __p;
        },

        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.autocompleteList = this.$('#autocomplete-list');
        },

        
        render: function(suggestions) {
            this.autocompleteList.html("");

            for (var i = 0; i < suggestions.length; i++){
                this.autocompleteList.append(this.template({
                    name: suggestions[i].properties.name, 
                    state: typeof suggestions[i].properties.state !== 'undefined' ? suggestions[i].properties.state : '', 
                    country: typeof suggestions[i].properties.country !== 'undefined' ? suggestions[i].properties.country : ''
                }));
            }
            events.trigger("autocompletepane:rendered");
        },
        
        show: function() {
            this.$el.show()
        },

        hide: function() {
            this.$el.hide()
        }
    });
    return AutocompletePane;
});
