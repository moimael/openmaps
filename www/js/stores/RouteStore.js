var alt = require('../alt');
var AppUtils = require('../utils/AppUtils');
var Actions = require('../actions/Actions');

class RouteStore {
  constructor() {
    this.directionIcons = {
      'Straight': 'leaflet-routing-icon-continue',
      'SlightRight': 'leaflet-routing-icon-bear-right ',
      'Right': 'leaflet-routing-icon-turn-right',
      'SharpRight': 'leaflet-routing-icon-sharp-right',
      'TurnAround': 'leaflet-routing-icon-u-turn',
      'SharpLeft': 'leaflet-routing-icon-sharp-left',
      'Left': 'leaflet-routing-icon-turn-left',
      'SlightLeft': 'leaflet-routing-icon-bear-left',
      'WaypointReached': 'leaflet-routing-icon-via',
      'Roundabout': 'leaflet-routing-icon-enter-roundabout',
      'StartAt': 'leaflet-routing-icon-depart',
      'DestinationReached': 'leaflet-routing-icon-arrive',
      'EnterAgainstAllowedDirection': '',
      'LeaveAgainstAllowedDirection': ''
    };
    this.routeStartText = "";
    this.routeEndText = "";
    this.hasStartLocation = false;
    this.hasDestLocation = false;
    this.locations = [];
    this.waypoints = [];
    this.calculateRoute = false;
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
      handleRouteFound: Actions.SHOW_ROUTE_INSTRUCTIONS,
      toggleInstructions: Actions.TOGGLE_INSTRUCTIONS,
      goBack: Actions.GO_BACK,
      // handleLocationsFailed: Actions.LOCATIONS_FAILED,
    });
  }

  handleUpdateStartLocations(locations) {
    this.startLocation = true;
    this.endLocation = false;
    this.hasStartLocation = false;
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
    var locationText = (item.data.housenumber ? item.data.housenumber + ' ' : '')
      + (item.data.street ? item.data.street + ', ' : item.data.name)
      + (item.data.city ? item.data.city : '');
    this.waypoints.push(item.data.latlng);

    if (this.startLocation) {
      this.routeStartText = locationText;
      this.hasStartLocation = true;
    } else {
      this.routeEndText = locationText;
      this.hasDestLocation = true;
    }

    if(this.hasStartLocation && this.hasDestLocation) {
      this.calculateRoute = true;
    }
    this.showSuggestions = false;
  }

  handleUpdateEndLocations(locations) {
    this.startLocation = false;
    this.endLocation = true;
    this.hasDestLocation = false;
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
    this.calculateRoute = false;
    this.hasRoute = true;

    this.route = {
      'instructions': routeData.routes[0].instructions.map(function(instruction) {
        return (
          {
            'id': AppUtils.generateUUID(),
            'imgClass': this.directionIcons[instruction.type],
            'mainText': instruction.road,
            'subText': AppUtils.secondsToTime(instruction.time) + ', ' + AppUtils.metersToDistance(instruction.distance),
            'data': instruction
          }
        );
      }.bind(this)),
      'totalTime': AppUtils.secondsToTime(routeData.routes[0].summary.totalTime, true),
      'totalDistance': AppUtils.metersToDistance(routeData.routes[0].summary.totalDistance)
    };
    this.showInstructions = true;
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  goBack() {
    /* FIXME: Learn to use alt.recycle */
    this.routeStartText = "";
    this.routeEndText = "";
    this.hasStartLocation = false;
    this.hasDestLocation = false;
    this.locations = [];
    this.waypoints = [];
    this.calculateRoute = false;
    this.hasRoute = false;
    this.showInstructions = false;
    this.route = {};
    this.startLocation = false;
    this.endLocation = false;
    this.errorMessage = null;
    this.showSuggestions = false;
  }
  // handleLocationsFailed(errorMessage) {
  //   this.errorMessage = errorMessage;
  // }
}

module.exports = alt.createStore(RouteStore, 'RouteStore');
