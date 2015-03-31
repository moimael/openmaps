var $ = require('jquery');
// var _ = require('underscore');
// var Backbone = require('backbone');
var React = require('react');
var App = require('./components/App.jsx');
// var MapView = require('./views/Map');
// var ActionBar = require('./views/ActionBar');
// var ToolBar = require('./views/ToolBar');
// var InstructionsPane = require('./views/InstructionsPane');
// var AutocompletePane = require('./views/AutocompletePane');
// var Common = require('./common');

React.initializeTouchEvents(true);

// ajax global settings
$.ajaxSetup( {
  xhr: function() {
    return new window.XMLHttpRequest({
        mozSystem: true
    });
  }
});

var app = React.render(<App />, document.getElementById('app'));

module.exports = app;

// events = _.clone(Backbone.Events);
// var AppView = Backbone.View.extend({

//     // Instead of generating a new element, bind to the existing skeleton of
//     // the App already present in the HTML.
//     el: 'body',

//     initialize: function() {
//         this.map = new MapView();
//         this.toolBar = new ToolBar();
//         this.actionBar = new ActionBar();
//         this.instructionsPane = new InstructionsPane();
//         this.autocompletePane = new AutocompletePane();

//         // ajax global settings
//         $.ajaxSetup( {
//             xhr: function() {
//                 return new window.XMLHttpRequest({
//                     mozSystem: true
//                 });
//             }
//         });

//         this.locate();

//         events.on('search:completed', this.searchCompleteHandler, this);
//         events.on('routing:completedlats', this.drawRoute, this);
//         events.on('routing:completedinstructions', this.setInstructions, this);
//         events.on('toolbar:locate', this.locate, this);
//         events.on('actionbarinstructions:back instructionspane:rendered actionbarroute:showinstructionspane', this.toggleView, this);
//         events.on('actionmenu:maplayer actionmenu:satellitelayer actionmenu:cyclelayer actionmenu:offlinelayer', this.changeMapType, this);
//     },


//     searchCompleteHandler: function(model){
//         if (this.actionBar.getCurrentView() === 'search'){
//             this.drawSearchMarker(model);
//         } else {
//             events.trigger("routing:search:completed", model);
//         }
//     },

//     drawSearchMarker: function(model) {
//         this.autocompletePane.hide();
//         var markerLocation = [model.get('lat'), model.get('lng')];
//         var marker = new L.Marker(markerLocation).addTo(this.map.hasMap());
//         marker.bindPopup("<b>" + model.get('name') + "<br/>" + model.get('state') + ", " + model.get('country') + "</b>").openPopup();
//         if(this.map.getMapType() === "road") {
//             this.map.hasMap().setView(markerLocation, 16);
//         }
//         else {
//             this.map.hasMap().setView(markerLocation, 11);
//         }
//     },
    
//     drawRoute: function(latlngs) {
//         this.map.drawRoute(latlngs);
//     },
    
//     locate: function() {
//         this.map.showLocation();
//     },
    
//     toggleView: function() {
//         $('#instructions-list-button').prop('disabled', false);
//         this.instructionsPane.toggle();
//     },
    
//     setInstructions: function(instructions) {
//         this.instructionsPane.render(instructions.routes[0].instructions);
//     },
    
//     changeMapType: function(mapType) {
//         this.map.setMapType(mapType);
//     }
// });

// $(function() {
//     // Kick things off by creating the **App**.
//     app = new AppView();
//     module.exports = app;
// });
