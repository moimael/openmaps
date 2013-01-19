define([
'zepto',
'underscore',
'backbone',
'./views/Map',
'./views/ActionBar',
'./views/ToolBar',
'./views/SideBar',
'./views/InstructionsPane',
'./common'
], function( $, _, Backbone, Map, ActionBar, ToolBar, SideBar, InstructionsPane, Common ) {
    events = _.clone(Backbone.Events);
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: 'body',

        initialize: function() {
            this.map = new Map();
            this.actionBar = new ActionBar();
            this.toolBar = new ToolBar();
            this.sideBar = new SideBar();
            this.instructionsPane = new InstructionsPane
            this.locate();
            
//            var deviceStorage = navigator.getDeviceStorage("");
//            console.log(deviceStorage);
//            console.log(deviceStorage.type);
//            cursor = deviceStorage.enumerate();
//            var file = deviceStorage.get('test.mbtiles');
//            console.log(file.getAsText());
            
            events.on('search:completed', this.drawSearchMarker, this);
            events.on('routing:completedlats', this.drawRoute, this);
            events.on('routing:completedinstructions', this.setInstructions, this);
            events.on('actionbarsearch:locate', this.locate, this);
            events.on('actionbarinstructions:back map:routefinished', this.toggleView, this);
            events.on('actionmenu:maplayer actionmenu:satellitelayer actionmenu:cyclelayer', this.changeMapType, this);

            
        },

        render: function() {
        },
        
        drawSearchMarker: function(inResults) {
            var markerLocation = [inResults.get('lat'), inResults.get('lng')];
            var marker = new L.Marker(markerLocation).addTo(app.map.hasMap());
            marker.bindPopup("<b>" + inResults.get('city') + ", " + inResults.get('county') + "<br/>" + inResults.get('state') + ", " + inResults.get('country') + "</b>").openPopup();
            app.map.hasMap().setView([inResults.get('lat'), inResults.get('lng')], 16);
            if(app.map.getMapType() === "road") {
                app.map.hasMap().setView(markerLocation, 16);
            }
            else {
                app.map.hasMap().setView(markerLocation, 11);
            }
        },
        
        drawRoute: function(latlngs) {
            this.map.drawRoute(latlngs);
        },
        
        locate: function() {
            this.map.showLocation();
        },
        
        toggleView: function() {
            this.instructionsPane.toggle();
        },
        
        setInstructions: function(instructions) {
            this.instructionsPane.render(instructions);
        },
        
        changeMapType: function(mapType) {
            this.map.setMapType(mapType);
        }
    });
    
    $(function() {
        // Kick things off by creating the **App**.
        app = new AppView();
    });
});
