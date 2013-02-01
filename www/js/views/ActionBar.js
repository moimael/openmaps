define([
'zepto',
'underscore',
'backbone',
'./ActionBarSearch',
'./ActionBarRoute',
'./ActionBarInstructions',
'../common'
], function( $, _, Backbone, ActionBarSearch, ActionBarRoute, ActionBarInstructions, Common ) {
    
    var ActionBar = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#action-bar',
        
        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },
        
        view: 'search',
        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            this.actionBarSearch = new ActionBarSearch();
            this.actionBarRoute = new ActionBarRoute();
            this.actionBarInstructions = new ActionBarInstructions();
            
            this.render();

            events.on('actionbarsearch:showrouteview', this.showRouteView, this);
            events.on('toolbar:togglesearchview', this.toggleSearchView, this);
            events.on('actionbarinstructions:back', this.showRouteView, this);
            events.on('instructionspane:rendered actionbarroute:showinstructionspane', this.showInstructionsView, this);
        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function() {
            if(this.view === 'search'){
                this.actionBarSearch.render();
            }
            else if(this.view === 'route'){
                this.actionBarRoute.render();
            }
            else if(this.view === 'instructions'){
                this.actionBarInstructions.render();
            }
        },
        
        toggleSearchView: function(){
            if(this.view === 'search'){
                this.view = 'route';
            } else {
                this.view = 'search'
            }
            this.render();
        },
        
        showRouteView: function(){
            this.view = 'route';
            this.render();
        },
        
        showInstructionsView: function(){
            this.view = 'instructions';
            this.render();
        }
    });
    return ActionBar;
});
