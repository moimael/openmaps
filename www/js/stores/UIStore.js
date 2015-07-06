var alt = require('../alt');
var AppUtils = require('../utils/AppUtils');
var Actions = require('../actions/Actions');


class UIStore {
  constructor() {
    this.searchText = "";
    this.locations = [];
    this.waypoints = [];
    // Put everything in locations, with an order parameter
    this.startLocation = null;
    this.endLocation = null;
    this.errorMessage = null;
    this.showSearchWidget = true;
    this.showRoutingWidget = false;
    this.showSuggestions = false;
    this.showLayerMenu = false;
    this.baseLayer = 'road';
    this.hasCurrentLocation = false;
    this.hasUserPosition = false;
    this.accuracy = null;
    this.currentLocation = null;
    this.userPosition = {
      lat: 51.505,
      lng: -0.09
    };
    this.zoom = 3;

    this.bindListeners({
      handleUpdateLocations: Actions.UPDATE_LOCATIONS,
      handleFetchLocations: Actions.FETCH_LOCATIONS,
      handleLocationsFailed: Actions.LOCATIONS_FAILED,
      toggleLayerMenu: Actions.TOGGLE_LAYER_MENU,
      toggleActionbar: Actions.TOGGLE_ACTIONBAR,
      changeLayer: Actions.CHANGE_LAYER,
      handleUserPosition: Actions.SHOW_USER_POSITION,
      handleCurrentLocation: Actions.SHOW_LOCATION,
      handleClearText: Actions.CLEAR_TEXT,
    });
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations(searchText) {
    this.searchText = searchText;
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    if (this.searchText !== "") {
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleClearText() {
    console.log("test");
    this.searchText = "";
  }

  handleUserPosition(location) {
    this.userPosition = location.latlng;
    this.searchText = location.name + ", " + location.state + ", " + location.country;
    this.accuracy = location.accuracy;
    this.hasUserPosition = true;
    this.zoom = 13;
  }

  handleCurrentLocation(location) {
    this.currentLocation = location;
    this.searchText = location.name + ", " + location.state + ", " + location.country;
    this.hasCurrentLocation = true;
    this.zoom = 16;
    this.showSuggestions = false;
  }

  toggleLayerMenu() {
    this.showLayerMenu = !this.showLayerMenu;
  }

  toggleActionbar() {
    this.showRoutingWidget = !this.showRoutingWidget;
  }

  changeLayer(layer) {
    this.baseLayer = layer;
  }
}

module.exports = alt.createStore(UIStore, 'UIStore');