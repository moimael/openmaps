var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _ui = {
  showSearchWidget: true,
  showRoutingWidget: false,
  searchText: '',
  showSuggestions: false,
  showLayerMenu: false,
  baseLayer: 'road',
  hasLocation: false,
  accuracy: null,
  latlng: {
    lat: 51.505,
    lng: -0.09
  },
  zoom: 3
}

function _addLocation(rawLocation) {
  _ui.latlng = rawLocation.latlng;
  _ui.accuracy = rawLocation.accuracy;
  _ui.hasLocation = true;
  _ui.zoom = 13;
}

function _toggleLayerMenu() {
  _ui.showLayerMenu = !_ui.showLayerMenu;
}

function _toggleActionbar() {
  _ui.showRoutingWidget = !_ui.showRoutingWidget;
}

function _changeLayer(layer) {
  _ui.baseLayer = layer;
}


var UIStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _ui[id];
  },

  getAll: function() {
    return _ui;
  }
});

UIStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.eventName) {

    case ActionTypes.SHOW_LOCATION:
      _addLocation(action.newItem);
      UIStore.emitChange();
      break;

    case ActionTypes.TOGGLE_LAYER_MENU:
      _toggleLayerMenu();
      UIStore.emitChange();
      break;

    case ActionTypes.TOGGLE_ACTIONBAR:
      _toggleActionbar();
      UIStore.emitChange();
      break;

    case ActionTypes.CHANGE_LAYER:
      _changeLayer(action.newItem);
      UIStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UIStore;
