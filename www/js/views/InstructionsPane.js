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
        icon_map: {
            // : 'leaflet-routing-icon-depart',
            Straight: 'leaflet-routing-icon-turn-continue',
            Left: 'leaflet-routing-icon-turn-left',
            Right: 'leaflet-routing-icon-turn-right',
            SlightLeft: 'leaflet-routing-icon-bear-left',
            SlightRight: 'leaflet-routing-icon-bear-right',
            // : 'leaflet-routing-icon-arrive'
            Roundabout: 'leaflet-routing-icon-u-turn'
        },
        
        // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
        // It is also much quicker to load this way.
        template: function(obj){
            var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
            with(obj||{}){
                __p+='<li><aside class="pack-start"><span class="leaflet-routing-icon '+
                ((__t=( icon ))==null?'':__t)+
                '"></span></aside><p>'+
                ((__t=( directive ))==null?'':__t)+
                '</p><p>'+
                ((__t=( duration ))==null?'':__t)+
                ', '+
                ((__t=( length ))==null?'':__t)+
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
            this.instructionsList = this.$('#instructions-list');
        },

        
        render: function(instructions) {
            this.instructionsList.html("");
            
            for (var i = 0; i < instructions.length; i++){
                this.instructionsList.append(this.template({
                    icon: this.icon_map[instructions[i].type],
                    directive: instructions[i].road, 
                    duration: Common.secondsToTime(instructions[i].time), 
                    length: Common.metersToDistance(instructions[i].distance)
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
