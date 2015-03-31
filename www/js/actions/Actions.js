var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Actions = {

/* ActionMenu */
  changeLayer: function (layer) {
    AppDispatcher.dispatch({
      eventName: AppConstants.ActionTypes.CHANGE_LAYER,
      newItem: layer
    });
  },

/* Actionbar */
  showLocation: function (location) {
    AppDispatcher.dispatch({
      eventName: AppConstants.ActionTypes.SHOW_LOCATION,
      newItem: location
    });
  },

  toggleLayerMenu: function () {
    AppDispatcher.dispatch({
      eventName: AppConstants.ActionTypes.TOGGLE_LAYER_MENU,
      newItem: null
    });
  },

  toggleActionbar: function () {
    AppDispatcher.dispatch({
      eventName: AppConstants.ActionTypes.TOGGLE_ACTIONBAR,
      newItem: null
    });
  },

};

module.exports = Actions;