var uuid = require('uuid');

module.exports = {

  isEmpty: function(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },

  secondsToTime: function(secs){
      var hours = Math.floor(secs / (60 * 60));

      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);

      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);

      var formattedTime = (hours > 0 ? hours + ' hour' + ((hours > 1) ? 's ' : ' ') : '') +
               (minutes > 0 ? minutes + ' minute' + ((minutes > 1) ? 's ' : ' ') : '') +
               seconds + ' second' + ((seconds > 1) ? 's' : '');
      return formattedTime;
  },

  metersToDistance: function(meters){
      if (meters > 1000) {
          var km = (meters / 1000).toFixed(1);
          var formattedKm = km + ' km';
          return formattedKm;
      }
      var formattedMeters = meters + " m";
      return formattedMeters;
  },

  generateUUID: function(){
    return uuid.v4();
  }
};
