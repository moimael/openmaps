var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
// var ActionBarSearch = require('./ActionBarSearch');
var Typeahead = require('../components/Typeahead.jsx');
var ActionBarRoute = require('./ActionBarRoute');
var ActionBarInstructions = require('./ActionBarInstructions');
var Common = require('../common');


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
        this.actionBarSearch = React.render(<Typeahead />, this.el);
        this.actionBarRoute = new ActionBarRoute();
        this.actionBarInstructions = new ActionBarInstructions();
        
        this.render();

        events.on('actionbarsearch:showrouteview', this.showRouteView, this);
        events.on('toolbar:togglesearchview', this.toggleSearchView, this);
        events.on('actionbarinstructions:back', this.showRouteView, this);
        events.on('instructionspane:rendered actionbarroute:showinstructionspane', this.showInstructionsView, this);
    },

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

    getCurrentView: function(){
        return this.view();
    },
    
    toggleSearchView: function(){
        if(this.view === 'search'){
            this.view = 'route';
        } else {
            this.view = 'search';
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

module.exports = ActionBar;

