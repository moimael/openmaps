define([
'zepto',
'underscore',
'backbone',
'leaflet',
'mq-map',
'mq-routing'
//'../models/OfflineMap'
], function( $, _, Backbone, Leaflet, MQMap, MQRouting) {

    L.Marker.prototype.animateDragging = function () {

        var iconMargin, shadowMargin;

        this.on('dragstart', function () {
            if (!iconMargin) {
              iconMargin = parseInt(L.DomUtil.getStyle(this._icon, 'marginTop'));
              shadowMargin = parseInt(L.DomUtil.getStyle(this._shadow, 'marginLeft'));
            }

            this._icon.style.marginTop = (iconMargin - 15)  + 'px';
            this._shadow.style.marginLeft = (shadowMargin + 8) + 'px';
        });

        return this.on('dragend', function () {
            this._icon.style.marginTop = iconMargin + 'px';
            this._shadow.style.marginLeft = shadowMargin + 'px';
        });
    };
    
    var MapView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#map',

        credentials: '8c92938a1540489f822ce0ade39e7acc',
        
        mapType: 'road',

        
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
//            this.offlineMap = new OfflineMap();
            L.Icon.Default.imagePath = '../../img'
            this.render();
            this.on('change:mapType', this.mapTypeChanged, this);
        },

        // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
        render: function() {
            this.destroyMap();
            try {
                this.createMap();
            } catch (e) {
                //fail to load map
                return;
            }

            // Create a CloudMade tile layer
            var mapQuest = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
                maxZoom: 18,
                subdomains: ['otile1', 'otile2', 'otile3', 'otile4'] 
            });

            // Create a OpenAerials tile layer
            var openAerials = new L.TileLayer('http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
                maxZoom: 18, 
                subdomains: ['otile1', 'otile2', 'otile3', 'otile4']
            });
            
            var openCycleMap = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
                maxZoom: 18, 
                subdomains: ['a', 'b', 'c']
            });
            
//            var offline = new L.TileLayer.MBTiles('', {
//                maxZoom: 18, 
//                subdomains: ['a', 'b', 'c']
//            }, this.offlineMap.getDb());

            this.baseMaps = {
                "road": mapQuest,
                "satellite": openAerials,
                "cycle": openCycleMap
//                "offline": offline
            };

            // Add the CloudMade layer to the map and set the view to a given center
            this.map.addLayer(mapQuest).setView(new L.LatLng(51.505, -0.09), 3);
            this.map.addLayer(this.layerGroup);
            this.map.addLayer(this.userGPSPosition);
            this.connectEvents();
            this.setMapType("road");
        },
        
        createMap: function(){
            this.map = new L.Map(this.el, {zoomControl : false, attributionControl: false});
            this.layerGroup = new L.LayerGroup();
            this.userGPSPosition = new L.LayerGroup();
        },
        
        destroyMap: function(){
            this.map = null;
        },
        
        hasMap: function() {
            return this.map;
        },

        hasLayers: function() {
            return this.layerGroup;
        },

        hasGPSLayers: function() {
            return this.userGPSPosition;
        },

        clearAll: function() {
            this.layerGroup.clearLayers();
        },

        clearGPSLayer: function() {
            this.userGPSPosition.clearLayers();
        },
        
        showLocation: function() {
            this.clearAll(); //TODO: refléchir quoi effacer
            this.map.locate({setView: true, maxZoom: 16, enableHighAccuracy: true});
        },

        connectEvents: function() {
            this.map.on('locationfound', this.gotLocation, this);
            this.map.on('locationerror', this.gotLocationError, this);
        },

        gotLocationError: function(e) {
//            this.doLocationError(e);
        },

        gotLocation: function(inResponse) {
            var radius = inResponse.accuracy / 2;
            var marker = new L.Marker(inResponse.latlng);
            this.map.addLayer(marker);
            marker.bindPopup("You are within " + radius + " meters from this point").openPopup();

            var circle = new L.Circle(inResponse.latlng, radius);
            this.map.addLayer(circle);
        },

        mapTypeChanged: function() {
        //switch case
            if (this.mapType == "road"){
                this.map.removeLayer(this.baseMaps.satellite);
                this.map.removeLayer(this.baseMaps.cycle);
                this.map.addLayer(this.baseMaps.road);
            }
            else if (this.mapType == "satellite"){
                this.map.removeLayer(this.baseMaps.road);
                this.map.removeLayer(this.baseMaps.cycle);
                this.map.addLayer(this.baseMaps.satellite);
            }
            else {
                this.map.removeLayer(this.baseMaps.road);
                this.map.removeLayer(this.baseMaps.satellite);
                this.map.addLayer(this.baseMaps.cycle);
            }
//            else {
//                this.map.removeLayer(this.baseMaps.road);
//                this.map.removeLayer(this.baseMaps.satellite);
//                this.map.removeLayer(this.baseMaps.cycle);
//                this.map.addLayer(this.baseMaps.offline);
//            }
        },
        
        setMapType: function(mapType) {
            this.mapType = mapType;
            this.trigger('change:mapType');
        },
        
        getMapType: function() {
            return this.mapType;
        },
        
        drawRoute: function(dir) {

            this.layerGroup.addLayer(MQ.routing.routeLayer({
              directions: dir,
              fitBounds: true,
              ribbonOptions: {
                draggable: false
              }
            }))
            // // Create a blue Polyline from an arrays of LatLng points
            // var polyline = new L.Polyline(latlngs);

            // // Create two markers with custom icons for route startPoint and endPoint
            // var startMarker = new L.Marker(latlngs[0], {
            //     icon: new L.Icon({
            //         iconUrl: 'img/marker-a.png', iconSize: new L.Point(25, 41),
            //         iconAnchor: new L.Point(13, 41),
            //         popupAnchor: new L.Point(0, -33),
            //         shadowSize: new L.Point(41, 41)
            //     })
            // });

            // var endMarker = new L.Marker(latlngs[latlngs.length - 1], {
            //     icon: new L.Icon({
            //         iconUrl: 'img/marker-b.png',
            //         iconSize: new L.Point(25, 41),
            //         iconAnchor: new L.Point(13, 41),
            //         popupAnchor: new L.Point(0, -33),
            //         shadowSize: new L.Point(41, 41)
            //     })
            // });

            // //Add the to markers on the map
            // this.layerGroup.addLayer(startMarker).addLayer(endMarker);

            // // Zoom the map to the Polyline
            // this.map.fitBounds(polyline.getBounds());

            // // Add the polyline to the map
            // this.layerGroup.addLayer(polyline);

            // Show route instruction in a sidebar popup
            events.trigger('map:routefinished');
        }
    });
    
    return MapView;
});
