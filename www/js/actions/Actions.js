var WebUtils = require('../utils/WebUtils');
var alt = require('../alt');

class Actions {

  /* Typeahead */
  fetchLocations(searchText) {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch(searchText);

    if ( !searchText ) {
      return;
    }

    WebUtils.search(searchText)
      .then((locations) => {
        locations = locations.features;
        for (var i=0; i < locations.length; i++) {
          locations[i] = WebUtils.parse(locations[i]);
        }
        // we can access other actions within our action through `this.actions`
        this.actions.updateLocations(locations);
      })
      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
  }

  updateLocations(locations) {
    this.dispatch(locations);
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  clearText() {
    this.dispatch();
  }

  showLocation(location) {
    this.dispatch(location);
  }

  /* Route */
  fetchStartLocations(searchText) {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch(searchText);

    if ( !searchText ) {
      return;
    }

    WebUtils.search(searchText)
      .then((locations) => {
        locations = locations.features;
        for (var i=0; i < locations.length; i++) {
          locations[i] = WebUtils.parse(locations[i]);
        }
        // we can access other actions within our action through `this.actions`
        this.actions.updateStartLocations(locations);
      })
      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
  }

  updateStartLocations(locations) {
    this.dispatch(locations);
  }

  confirmLocation(location) {
    this.dispatch(location);
  }

  fetchEndLocations(searchText) {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch(searchText);

    if ( !searchText ) {
      return;
    }

    WebUtils.search(searchText)
      .then((locations) => {
        locations = locations.features;
        for (var i=0; i < locations.length; i++) {
          locations[i] = WebUtils.parse(locations[i]);
        }
        // we can access other actions within our action through `this.actions`
        this.actions.updateEndLocations(locations);
      })
      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
  }

  updateEndLocations(locations) {
    this.dispatch(locations);
  }

  /* ActionMenu */
  changeLayer(layer) {
    this.dispatch(layer);
  }

  /* Actionbar */
  showUserPosition(location) {
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