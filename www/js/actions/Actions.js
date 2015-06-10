// var AppDispatcher = require('../dispatcher/AppDispatcher');
// var AppConstants = require('../constants/AppConstants');
var WebUtils = require('../utils/WebUtils');
var alt = require('../alt');

class Actions {

  /* Typeahead */
  fetchLocations(searchText) {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();
    WebUtils.search(searchText)
      .then((locations) => {
        locations = locations.features;
        for (var i=0; i < locations.length; i++) {
          locations[i] = WebUtils.parse(locations[i]);
          console.log(locations[i]);
        }
        // we can access other actions within our action through `this.actions`
        this.actions.updateLocations(locations);
      })
      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
  }

  updateLocations(locations) {
    console.log(locations);
    this.dispatch(locations);
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  /* ActionMenu */
  changeLayer(layer) {
    this.dispatch(layer);
  }

  /* Actionbar */
  showLocation(location) {
    this.dispatch(location);
  }

  toggleLayerMenu() {
    this.dispatch();
  }

  toggleActionbar() {
    this.dispatch();
  }
}

module.exports = alt.createActions(Actions);


// var Actions = {

// /* Typeahead */
//   search: function (searchText) {
//     suggestions = WebUtils.search(searchText);
//     AppDispatcher.dispatch({
//       eventName: AppConstants.ActionTypes.SEARCH,
//       newItem: suggestions
//     });
//   },

// /* ActionMenu */
//   changeLayer: function (layer) {
//     AppDispatcher.dispatch({
//       eventName: AppConstants.ActionTypes.CHANGE_LAYER,
//       newItem: layer
//     });
//   },

// /* Actionbar */
//   showLocation: function (location) {
//     AppDispatcher.dispatch({
//       eventName: AppConstants.ActionTypes.SHOW_LOCATION,
//       newItem: location
//     });
//   },

//   toggleLayerMenu: function () {
//     AppDispatcher.dispatch({
//       eventName: AppConstants.ActionTypes.TOGGLE_LAYER_MENU,
//       newItem: null
//     });
//   },

//   toggleActionbar: function () {
//     AppDispatcher.dispatch({
//       eventName: AppConstants.ActionTypes.TOGGLE_ACTIONBAR,
//       newItem: null
//     });
//   },

// };

// module.exports = Actions;