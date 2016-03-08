import alt from '../alt';
import AppUtils from '../utils/AppUtils';
import Actions from '../actions/Actions';
import SearchActions from '../actions/SearchActions';


class UIStore {
  constructor() {
    // this.searchText = "";
    // this.results = [];
    // this.locations = [];
    this.waypoints = [];
    // Put everything in locations, with an order parameter
    this.startLocation = null;
    this.endLocation = null;
    this.errorMessage = null;
    this.showRoutingWidget = false;
    this.showSuggestions = false;
    this.showLayerMenu = false;
    this.baseLayer = 'road';
    this.hasCurrentLocation = false;
    this.hasUserPosition = false;
    this.accuracy = null;
    this.currentLocation = null;
    this.userPosition = null;
    this.zoom = 3;
    this.center = {
      lat: 51.505,
      lng: -0.09
    };

    this.bindListeners({
      // handleReceivedResults: SearchActions.RECEIVED_RESULTS,
      // handleUpdateLocations: Actions.UPDATE_LOCATIONS,
      // handleFetchLocations: Actions.FETCH_LOCATIONS,
      // handleLocationsFailed: Actions.LOCATIONS_FAILED,
      toggleLayerMenu: Actions.TOGGLE_LAYER_MENU,
      toggleActionbar: Actions.TOGGLE_ACTIONBAR,
      changeLayer: Actions.CHANGE_LAYER,
      handleUserPosition: Actions.SHOW_USER_POSITION,
      handleCurrentLocation: Actions.SHOW_LOCATION,
      handleClearText: Actions.CLEAR_TEXT,
      goBack: Actions.GO_BACK,
    });

    if(window.MozActivity) {
      navigator.mozSetMessageHandler('activity', function(aRequestHandler) {
        var activityOptions = aRequestHandler.source;
        if (activityOptions.name == 'view') {
          this.handleCurrentLocation({
            'latlng': option.position
          });
        }
      });
    }
  }

  handleReceivedResults(results) {
    console.log(results);
  }

  handleUpdateLocations(locations) {
    this.locations = locations.map(function(location) {
      return ({
          'id': location.id,
          'mainText':  (location.housenumber ? location.housenumber + ' ' : '') + (location.street ? location.street : location.name),
          'subText': (location.city ? location.city + ', ' : '') + location.country,
          'data': location
        }
      );
    });
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
    this.searchText = "";
    this.showSuggestions = false;
    this.locations = [];
  }

  handleUserPosition(location) {
    this.userPosition = location.latlng;
    this.accuracy = location.accuracy;
    this.hasUserPosition = true;
    this.center = this.userPosition;
    this.zoom = 13;
  }

  handleCurrentLocation(item) {
    this.currentLocation = item.data;
    this.searchText = (this.currentLocation.housenumber ? this.currentLocation.housenumber + ' ' : '')
      + (this.currentLocation.street ? this.currentLocation.street + ', ' : this.currentLocation.name)
      + (this.currentLocation.city ? this.currentLocation.city : '');
    this.hasCurrentLocation = true;
    this.zoom = 16;
    this.center = this.currentLocation.latlng;
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

  goBack() {
    this.showRoutingWidget = false;
  }
}

export default alt.createStore(UIStore, 'UIStore');
