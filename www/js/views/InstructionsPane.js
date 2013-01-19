define([
'zepto',
'underscore',
'backbone',
'text!../templates/instruction-item.html',
'../common'
], function( $, _, Backbone, itemTemplate, Common ) {
    
    var InstructionsPane = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#instructions-pane',
        
        // Compile our item template.
        template: _.template(itemTemplate),
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.instructionsList = this.$('#instructions-list');

//            events.on('actionbarsearch:showrouteview', this.showRouteView, this);
//            events.on('actionbarroute:showsearchview', this.showSearchView, this);
        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function(instructions) {
            
            this.instructionsList.html("");
            
            for (var i = 0; i < instructions.length; i++){
                this.instructionsList.append(this.template({
                    directive: instructions[i][0], 
                    duration: Common.secondsToTime(instructions[i][3]), 
                    length: instructions[i][4],
                }));
            }
//            this.instructionsList.append(this.template());
        },
        
        toggle: function() {
            this.$el.toggleClass('slide-view-vertical');
        }
        
    });
    return InstructionsPane;
});
