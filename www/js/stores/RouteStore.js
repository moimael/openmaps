var alt = require('../alt');
var AppUtils = require('../utils/AppUtils');
var Actions = require('../actions/Actions');


class RouteStore {
  constructor() {
    this.routeStartText = "";
    this.routeEndText = "";
    this.locations = [];
    this.waypoints = [];
    this.hasRoute = false;
    this.showInstructions = false;
    this.route = {};
    // Put everything in locations, with an order parameter
    this.startLocation = false;
    this.endLocation = false;
    this.errorMessage = null;
    this.showSuggestions = false;

    this.bindListeners({
      handleUpdateStartLocations: Actions.UPDATE_START_LOCATIONS,
      handleFetchStartLocations: Actions.FETCH_START_LOCATIONS,
      handleUpdateEndLocations: Actions.UPDATE_END_LOCATIONS,
      handleConfirmLocation: Actions.CONFIRM_LOCATION,
      handleFetchEndLocations: Actions.FETCH_END_LOCATIONS,
      handleRouteFound: Actions.SHOW_ROUTE_INSTRUCTIONS
      // handleLocationsFailed: Actions.LOCATIONS_FAILED,
    });
  }

  handleUpdateStartLocations(locations) {
    this.startLocation = true;
    this.endLocation = false;
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchStartLocations(searchText) {
    this.routeStartText = searchText;
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    if (this.routeStartText !== "") {
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
    this.locations = [];
  }

  handleConfirmLocation(location) {
    var locationText = location.name + ", " + (location.state ? location.state + ", " : "") + location.country;
    this.waypoints.push(location.latlng);
    if (this.startLocation) {
      this.routeStartText = locationText;
    } else {
      this.routeEndText = locationText;
      this.hasRoute = true;
    }
    this.showSuggestions = false;
  }

  handleUpdateEndLocations(locations) {
    this.startLocation = false;
    this.endLocation = true;
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchEndLocations(searchText) {
    this.routeEndText = searchText;
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    if (this.routeEndText !== "") {
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
    this.locations = [];
  }

  /* TODO: Manage multiple routes */
  handleRouteFound(routeData) {
    console.log(routeData);
    this.route = {
      'instructions': routeData.routes[0].instructions,
      'totalTime': AppUtils.secondsToTime(routeData.routes[0].summary.totalTime),
      'totalDistance': AppUtils.metersToDistance(routeData.routes[0].summary.totalDistance)
    }
    this.hasRoute = false;
    this.showInstructions = true;
  }

  // handleLocationsFailed(errorMessage) {
  //   this.errorMessage = errorMessage;
  // }
}

module.exports = alt.createStore(RouteStore, 'RouteStore');
