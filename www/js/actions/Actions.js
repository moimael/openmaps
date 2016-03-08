import alt from '../alt';
import WebUtils from '../utils/WebUtils';

class Actions {

  /* Typeahead */
  fetchLocations(searchText, boundsCenter) {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch(searchText);

      if ( !searchText || searchText.length <= 1 ) {
        return;
      }

      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
      WebUtils.search(searchText, boundsCenter)
        .then((locations) => {
          locations = locations.features;
          locations = locations.map((location) => {
            return WebUtils.parse(location);
          });
          this.updateLocations(locations);
        })
    };
    return searchText;
  }

  updateLocations(locations) {
    return locations;
  }

  locationsFailed(errorMessage) {
    return errorMessage;
  }

  clearText() {
    return;
  }

  showLocation(location) {
    return location;
  }

  /* Route */
  fetchStartLocations(searchText) {
    return function(dispatch) {
      // we dispatch an event here so we can have "loading" state.
      dispatch(searchText);

      if ( !searchText ) {
        return;
      }

      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
      WebUtils.search(searchText)
        .then((locations) => {
          locations = locations.features;
          for (var i=0; i < locations.length; i++) {
            locations[i] = WebUtils.parse(locations[i]);
          }
          // we can access other actions within our action through `this.actions`
          this.updateStartLocations(locations);
        })
    };
  }

  updateStartLocations(locations) {
    return locations;
  }

  confirmLocation(location) {
    return location;
  }

  fetchEndLocations(searchText) {
    return function(dispatch) {
      // we dispatch an event here so we can have "loading" state.
      dispatch(searchText);

      if ( !searchText ) {
        return;
      }

      // .catch((errorMessage) => {
      //   this.actions.locationsFailed(errorMessage);
      // });
      WebUtils.search(searchText)
        .then((locations) => {
          locations = locations.features;
          for (var i=0; i < locations.length; i++) {
            locations[i] = WebUtils.parse(locations[i]);
          }
          // we can access other actions within our action through `this.actions`
          this.updateEndLocations(locations);
        })
    };
  }

  updateEndLocations(locations) {
    return locations;
  }

  showRouteInstructions(routeData) {
    return routeData;
  }

  toggleInstructions() {
    return function(dispatch) {
      dispatch();
    }
  }

  goBack() {
    return function(dispatch) {
      dispatch();
    }
  }

  /* ActionMenu */
  changeLayer(layer) {
    return layer;
  }

  /* Actionbar */
  showUserPosition(location) {
    return location;
  }

  toggleLayerMenu() {
    return function(dispatch) {
      dispatch();
    }
  }

  toggleActionbar() {
    return function(dispatch) {
      dispatch();
    }
  }
}

export default alt.createActions(Actions);
