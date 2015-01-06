define([
'zepto',
'underscore',
'backbone',
'./views/Map',
'./views/ActionBar',
'./views/ToolBar',
//'./views/SideBar',
'./views/InstructionsPane',
//'./models/OfflineMap',
'./common'
], function( $, _, Backbone, Map, ActionBar, ToolBar, InstructionsPane, Common ) {
    events = _.clone(Backbone.Events);
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: 'body',

        initialize: function() {
            this.map = new Map();
            this.toolBar = new ToolBar();
            this.actionBar = new ActionBar();
            this.instructionsPane = new InstructionsPane();

            // Zepto ajax global settings
            $.ajaxSettings.xhr = function() {
                return new window.XMLHttpRequest({
                    mozSystem: true
                });
            };

            this.locate();
            
            events.on('search:completed', this.drawSearchMarker, this);
            events.on('routing:completedlats', this.drawRoute, this);
            events.on('routing:completedinstructions', this.setInstructions, this);
            events.on('toolbar:locate', this.locate, this);
            events.on('actionbarinstructions:back instructionspane:rendered actionbarroute:showinstructionspane', this.toggleView, this);
            events.on('actionmenu:maplayer actionmenu:satellitelayer actionmenu:cyclelayer actionmenu:offlinelayer', this.changeMapType, this);

            
        },

        render: function() {
        },
        
        drawSearchMarker: function(inResults) {
            var markerLocation = [inResults.get('lat'), inResults.get('lng')];
            var marker = new L.Marker(markerLocation).addTo(this.map.hasMap());
            marker.bindPopup("<b>" + inResults.get('city') + ", " + inResults.get('county') + "<br/>" + inResults.get('state') + ", " + inResults.get('country') + "</b>").openPopup();
            this.map.hasMap().setView([inResults.get('lat'), inResults.get('lng')], 16);
            if(this.map.getMapType() === "road") {
                this.map.hasMap().setView(markerLocation, 16);
            }
            else {
                this.map.hasMap().setView(markerLocation, 11);
            }
        },
        
        drawRoute: function(latlngs) {
            this.map.drawRoute(latlngs);
        },
        
        locate: function() {
            this.map.showLocation();
        },
        
        toggleView: function() {
            $('#instructions-list-button').prop('disabled', false);
            this.instructionsPane.toggle();
        },
        
        setInstructions: function(instructions) {
            this.instructionsPane.render(instructions.routes[0].instructions);
        },
        
        changeMapType: function(mapType) {
            this.map.setMapType(mapType);
        }
    });
    
    Zepto(function() {
        // Kick things off by creating the **App**.
        app = new AppView();
    });
});
