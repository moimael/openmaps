var React = require('react');
require('leaflet');
var Map = require('react-leaflet/lib/Map');
var TileLayer = require('react-leaflet/lib/TileLayer');
var Circle = require('react-leaflet/lib/Circle');
var Marker = require('react-leaflet/lib/Marker');
var Popup = require('react-leaflet/lib/Popup');
var Actions = require('../actions/Actions');
require('leaflet-routing-machine');


var MapComponent = React.createClass({

  componentDidMount: function() {

    L.Icon.Default.imagePath = '../img';
    this.routeControl =  new L.Routing.control({});

    this.routeControl.on('routesfound', function(routeData) {
      Actions.showRouteInstructions(routeData);
    });
    // Listen to device orientation changes
    window.addEventListener('deviceorientation', this.handleOrientation);
  },

  componentWillUnmount: function() {
    window.removeEventListener('deviceorientation', this.handleOrientation);
  },

  _handleOrientation: function(e) {
    // this.setState({windowWidth: window.innerWidth});
  },

  handleLocationFound: function(e) {
    Actions.showUserPosition(e);
  },

  locate: function() {
    this.refs.map.leafletElement.locate();
  },

  calculateRoute: function() {
    // Clear previous routes
    this.routeControl.getPlan().setWaypoints([]);
    console.log(this.props.routeState.waypoints);
    // Add new waypoints
    this.routeControl.getPlan().setWaypoints([L.latLng(this.props.routeState.waypoints[0].lat, this.props.routeState.waypoints[0].lng), L.latLng(this.props.routeState.waypoints[1].lat, this.props.routeState.waypoints[1].lng)]);

    // Display route
    this.refs.map.leafletElement.addLayer(this.routeControl);
  },

  render: function() {
    var radius = Math.round(this.props.uiState.accuracy / 2);
    var baseLayer;
    var center = this.props.uiState.userPosition;

    if (this.props.uiState.baseLayer === 'road') {
      baseLayer = <TileLayer
          key={this.props.uiState.baseLayer}
          url="http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png"
          subdomains={['otile1', 'otile2', 'otile3', 'otile4']} />;
      } else if (this.props.uiState.baseLayer === 'satellite') {
      baseLayer = <TileLayer
          key={this.props.uiState.baseLayer}
          url="http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png"
          subdomains={['otile1', 'otile2', 'otile3', 'otile4']} />;
      } else if (this.props.uiState.baseLayer === 'cycle') {
      baseLayer = <TileLayer
          key={this.props.uiState.baseLayer}
          url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']} />;
    }

    if (this.props.uiState.hasUserPosition) {
      center = this.props.uiState.userPosition;
    } else if (this.props.uiState.hasCurrentLocation) {
      center = this.props.uiState.currentLocation.latlng;
    }

    if (this.props.routeState.hasRoute) {
      this.calculateRoute();
    }

    var currentPositionMarker = L.divIcon({className: 'current-location'});

    return (
      <Map id={this.props.id} ref="map" center={center} zoom={this.props.uiState.zoom} zoomControl={false} attributionControl={false} worldCopyJump={true} boxZoom={false} onLocationfound={this.handleLocationFound}>
        {baseLayer}
        {this.props.uiState.hasUserPosition ?
          <Circle center={this.props.uiState.userPosition} radius={radius} color="#FF4E00"></Circle> : null}
        {this.props.uiState.hasUserPosition ?
          <Marker position={this.props.uiState.userPosition} icon={currentPositionMarker}>
            <Popup>
              <span>You are within {radius} meters from this point</span>
            </Popup>
          </Marker> : null}
        {this.props.uiState.hasCurrentLocation ?
          <Marker position={this.props.uiState.currentLocation.latlng}>
            <Popup>
              <span>
                {this.props.uiState.currentLocation.name}<br/>
              {this.props.uiState.currentLocation.state} {this.props.uiState.currentLocation.country}
              </span>
            </Popup>
          </Marker> : null}
      </Map>
    );
  }
});

module.exports = MapComponent;
