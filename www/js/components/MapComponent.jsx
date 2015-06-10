var React = require('react');
var Leaflet = require('leaflet');
var Map = require('react-leaflet/lib/Map');
var TileLayer = require('react-leaflet/lib/TileLayer');
var Circle = require('react-leaflet/lib/Circle');
var Marker = require('react-leaflet/lib/Marker');
var Popup = require('react-leaflet/lib/Popup');
var Actions = require('../actions/Actions');


var MapComponent = React.createClass({

  componentDidMount: function() {

    L.Icon.Default.imagePath = '../img';
    // Listen to device orientation changes
    window.addEventListener('deviceorientation', this.handleOrientation);
    // MapStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    window.removeEventListener('deviceorientation', this.handleOrientation);
  },

  _handleOrientation: function(e) {
    // this.setState({windowWidth: window.innerWidth});
  },

  handleLocationFound: function(e) {
    Actions.showLocation(e);
  },

  locate: function() {
    this.refs.map.leafletElement.locate();
  },

  render: function() {
    var radius = this.props.mapState.accuracy / 2;
    var baseLayer;
    if (this.props.mapState.baseLayer === 'road') {
      baseLayer = <TileLayer
          key={this.props.mapState.baseLayer}
          url="http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png"
          subdomains={['otile1', 'otile2', 'otile3', 'otile4']} />;
    } else if (this.props.mapState.baseLayer === 'satellite') {
      baseLayer = <TileLayer
          key={this.props.mapState.baseLayer}
          url="http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png"
          subdomains={['otile1', 'otile2', 'otile3', 'otile4']} />;
    } else if (this.props.mapState.baseLayer === 'cycle') {
      baseLayer = <TileLayer
          key={this.props.mapState.baseLayer}
          url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']} />;
    }

    return (
      <Map id={this.props.id} ref="map" center={this.props.mapState.latlng} zoom={this.props.mapState.zoom} zoomControl={false} attributionControl={false} worldCopyJump={true} boxZoom={false} onLocationfound={this.handleLocationFound}>
        {baseLayer}
        {this.props.mapState.hasLocation ?
        <Circle center={this.props.mapState.latlng} radius={radius} color="#FF4E00">
          <Marker position={this.props.mapState.latlng}>
            <Popup>
              <span>You are within {radius} meters from this point</span>
            </Popup>
          </Marker>
        </Circle> : null}
      </Map>
    );
  }
});

module.exports = MapComponent;