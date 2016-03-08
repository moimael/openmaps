import React from 'react';
import 'leaflet';
import { setIconDefaultImagePath, Map, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import Actions from '../actions/Actions';
import 'leaflet-routing-machine';

import './L.TileLayer.PouchDBCached'


class MapComponent extends React.Component{

  constructor(props) {
    super(props);
    this.locate = this.locate.bind(this);
    this.getBoundsCenter = this.getBoundsCenter.bind(this);
    this.clearRoutes = this.clearRoutes.bind(this);
    this.calculateRoute = this.calculateRoute.bind(this);

    // L.Icon.Default.imagePath = '../img';
    setIconDefaultImagePath('../img');
    this.routeControl =  new L.Routing.control({
      serviceUrl: 'http://router.project-osrm.org/viaroute'
    });

    this.routeControl.on('routesfound', function(routeData) {
      Actions.showRouteInstructions(routeData);
    });
    // Listen to device orientation changes
    window.addEventListener('deviceorientation', this.handleOrientation);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('deviceorientation', this.handleOrientation);
  // }

  _handleOrientation(e) {
    // this.setState({windowWidth: window.innerWidth});
  }

  handleLocationFound(e) {
    Actions.showUserPosition(e);
  }

  locate() {
    this.refs.map.leafletElement.locate();
  }

  getBoundsCenter() {
    return this.refs.map.leafletElement.getBounds().getCenter();
  }

  clearRoutes() {
    this.routeControl.getPlan().setWaypoints([]);
  }

  calculateRoute() {
    // Clear previous routes
    this.clearRoutes();

    // Add new waypoints
    this.routeControl.getPlan().setWaypoints([L.latLng(this.props.waypoints[0].lat, this.props.waypoints[0].lng), L.latLng(this.props.waypoints[1].lat, this.props.waypoints[1].lng)]);

    // Display route
    this.refs.map.leafletElement.addLayer(this.routeControl);
  }

  render() {
    var radius = Math.round(this.props.accuracy / 2);
    var baseLayer;
    var center = this.props.userPosition;

    if (this.props.baseLayer === 'road') {
      baseLayer = <TileLayer
          key={this.props.baseLayer}
          url="http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png"
          subdomains={['otile1', 'otile2', 'otile3', 'otile4']}
          useCache={true} />;
      } else if (this.props.baseLayer === 'satellite') {
      baseLayer = <TileLayer
          key={this.props.baseLayer}
          url="http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png"
          subdomains={['otile1', 'otile2', 'otile3', 'otile4']} />;
      } else if (this.props.baseLayer === 'cycle') {
      baseLayer = <TileLayer
          key={this.props.baseLayer}
          url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']} />;
    }

    if (this.props.calculateRoute) {
      this.calculateRoute();
    }

    var currentPositionMarker = L.divIcon({className: 'current-location'});

    return (
      <Map id={this.props.id} ref="map" center={this.props.center} zoom={this.props.zoom} zoomControl={false} attributionControl={false} worldCopyJump={true} boxZoom={false} onLocationfound={this.handleLocationFound}>
        {baseLayer}
        {this.props.hasUserPosition ?
          <Circle center={this.props.userPosition} radius={radius} color="#FF4E00"></Circle> : null}
        {this.props.hasUserPosition ?
          <Marker position={this.props.userPosition} icon={currentPositionMarker}></Marker> : null}
        {this.props.hasCurrentLocation ?
          <Marker position={this.props.currentLocation.latlng}></Marker> : null}
      </Map>
    );
  }
};

export default MapComponent;
