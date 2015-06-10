// var AppDispatcher = require('../dispatcher/AppDispatcher');
// var AppConstants = require('../constants/AppConstants');
// var AppUtils = require('../utils/AppUtils');
// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');

// var ActionTypes = AppConstants.ActionTypes;
// var CHANGE_EVENT = 'change';

// var _waypoints = {};

// function _addWaypoint(rawLocation) {
//     if (!_waypoints[rawLocation.id]) {
//       _waypoints[rawLocation.cid] = AppUtils.convertRawLocation(rawLocation);
//     }
// };

// function _addWaypoints(rawLocations) {
//   rawLocations.forEach(_addWaypoint(rawLocation));
// };

// var WaypointStore = assign({}, EventEmitter.prototype, {

//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },

//   *
//    * @param {function} callback
   
//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },

//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   },

//   get: function(id) {
//     return _waypoints[id];
//   },

//   getAll: function() {
//     return _waypoints;
//   }
// });

// WaypointStore.dispatchToken = AppDispatcher.register(function(action) {
//   switch(action.eventName) {

//     case AppConstants.ActionTypes.CLICK_LOCATION:
//       _addWaypoint(action.newItem);
//       WaypointStore.emitChange();
//       break;

//     default:
//       // do nothing
//   }

// });

// module.exports = WaypointStore;
