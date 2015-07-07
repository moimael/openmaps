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
    this.locations = locations.map(function(location) {
        return ({
            'id': location.id,
            'mainText': location.name,
            'subText': (location.state ? location.state + ", " : null) + location.country,
            'data': location
          }
        );
      });
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

  handleConfirmLocation(item) {
    var locationText = item.data.name + ", " + (item.data.state ? item.data.state + ", " : "") + item.data.country;
    this.waypoints.push(item.data.latlng);
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
    this.locations = locations.map(function(location) {
      return ({
          'id': location.id,
          'mainText': location.name,
          'subText': (location.state ? location.state + ", " : null) + location.country,
          'data': location
        }
      );
    });
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
      'instructions': routeData.routes[0].instructions.map(function(instruction) {
        return (
          {
            'id': AppUtils.generateUUID(),
            'mainText': instruction.road,
            'subText': AppUtils.secondsToTime(instruction.time) + ', ' + AppUtils.metersToDistance(instruction.distance)
          }
        );
      }),
      'totalTime': AppUtils.secondsToTime(routeData.routes[0].summary.totalTime),
      'totalDistance': AppUtils.metersToDistance(routeData.routes[0].summary.totalDistance)
    };
    this.hasRoute = false;
    this.showInstructions = true;
  }

  // handleLocationsFailed(errorMessage) {
  //   this.errorMessage = errorMessage;
  // }
}

module.exports = alt.createStore(RouteStore, 'RouteStore');
