// var AppDispatcher = require('../dispatcher/AppDispatcher');
// var AppConstants = require('../constants/AppConstants');
var alt = require('../alt');
var AppUtils = require('../utils/AppUtils');
var Actions = require('../actions/Actions');
// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');

// var ActionTypes = AppConstants.ActionTypes;
// var CHANGE_EVENT = 'change';

// var _ui = {
//   showSearchWidget: true,
//   showRoutingWidget: false,
//   showSuggestions: false,
//   showLayerMenu: false,
//   baseLayer: 'road',
//   hasLocation: false,
//   accuracy: null,
//   latlng: {
//     lat: 51.505,
//     lng: -0.09
//   },
//   zoom: 3
// }

// function _addLocation(rawLocation) {
//   _ui.latlng = rawLocation.latlng;
//   _ui.accuracy = rawLocation.accuracy;
//   _ui.hasLocation = true;
//   _ui.zoom = 13;
// }

// function _toggleLayerMenu() {
//   _ui.showLayerMenu = !_ui.showLayerMenu;
// }

// function _toggleActionbar() {
//   _ui.showRoutingWidget = !_ui.showRoutingWidget;
// }

// function _changeLayer(layer) {
//   _ui.baseLayer = layer;
// }

// function _search(suggestions) {
//   if (AppUtils.isEmpty(suggestions)){
//     _ui.showSuggestions = false;
//   }
//   else {
//     _ui.showSuggestions = true;
//   }
// }


// var UIStore = assign({}, EventEmitter.prototype, {

//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },

//   /**
//    * @param {function} callback
//    */
//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },

//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   },

//   get: function(id) {
//     return _ui[id];
//   },

//   getAll: function() {
//     return _ui;
//   }
// });

// UIStore.dispatchToken = AppDispatcher.register(function(action) {

//   switch(action.eventName) {

//     case ActionTypes.SEARCH:
//       _search(action.newItem);
//       UIStore.emitChange();
//       break;

//     case ActionTypes.SHOW_LOCATION:
//       _addLocation(action.newItem);
//       UIStore.emitChange();
//       break;

//     case ActionTypes.TOGGLE_LAYER_MENU:
//       _toggleLayerMenu();
//       UIStore.emitChange();
//       break;

//     case ActionTypes.TOGGLE_ACTIONBAR:
//       _toggleActionbar();
//       UIStore.emitChange();
//       break;

//     case ActionTypes.CHANGE_LAYER:
//       _changeLayer(action.newItem);
//       UIStore.emitChange();
//       break;

//     default:
//       // do nothing
//   }

// });

// module.exports = UIStore;


class UIStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;
    this.showSearchWidget = true;
    this.showRoutingWidget = false;
    this.showSuggestions = false;
    this.showLayerMenu = false;
    this.baseLayer = 'road';
    this.hasLocation = false;
    this.accuracy = null;
    this.latlng = {
      lat: 51.505,
      lng: -0.09
    };
    this.zoom = 3;

    this.bindListeners({
      handleUpdateLocations: Actions.UPDATE_LOCATIONS,
      handleFetchLocations: Actions.FETCH_LOCATIONS,
      handleLocationsFailed: Actions.LOCATIONS_FAILED
    });
  }

  handleUpdateLocations(locations) {
    if (AppUtils.isEmpty(locations)){
      this.showSuggestions = false;
    }
    else {
      this.showSuggestions = true;
    }
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  addLocation(rawLocation) {
    this.latlng = rawLocation.latlng;
    this.accuracy = rawLocation.accuracy;
    this.hasLocation = true;
    this.zoom = 13;
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

  search(suggestions) {
    if (AppUtils.isEmpty(suggestions)){
      this.showSuggestions = false;
    }
    else {
      this.showSuggestions = true;
    }
  }
}

module.exports = alt.createStore(UIStore, 'UIStore');