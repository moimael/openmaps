define([
'zepto',
'underscore',
'backbone',
'../common'
], function( $, _, Backbone, Common ) {
    
    var InstructionsPane = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#instructions-pane',
        
        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<li>\n<p>'+
                ((__t=( directive ))==null?'':__t)+
                '</p>\n    <p>'+
                ((__t=( duration ))==null?'':__t)+
                ', '+
                ((__t=( length ))==null?'':__t)+
                '</p>\n</li>\n';
            }
            return __p;
        },
        //<aside class="icon icon-callout">asidecall</aside>\n
        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.instructionsList = this.$('#instructions-list');
        },

        
        render: function(instructions) {
            this.instructionsList.html("");
            
            for (var i = 0; i < instructions.length; i++){
                this.instructionsList.append(this.template({
                    icon: instructions[i].iconUrl,
                    directive: instructions[i].narrative, 
                    duration: Common.secondsToTime(instructions[i].time), 
                    length: instructions[i].distance
                }));
            }
            events.trigger("instructionspane:rendered");
        },
        
        toggle: function() {
            this.$el.toggleClass('slide-view-vertical-in');
        }
        
    });
    return InstructionsPane;
});
