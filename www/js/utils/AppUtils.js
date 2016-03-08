import uuid from 'uuid';

export default {

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
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },

  secondsToTime: function(secs, short = false){
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let formattedTime = null;

      if (short) {
        formattedTime = (hours > 0 ? hours + 'h' : '') +
                 (minutes > 0 ? minutes : '');
      } else {
        formattedTime = (hours > 0 ? hours + ' hour' + ((hours > 1) ? 's ' : ' ') : '') +
                 (minutes > 0 ? minutes + ' minute' + ((minutes > 1) ? 's ' : ' ') : '') +
                 seconds + ' second' + ((seconds > 1) ? 's' : '');
      }
      return formattedTime;
  },

  metersToDistance: function(meters){
      if (meters > 1000) {
          let km = (meters / 1000).toFixed(1);
          let formattedKm = km + 'km';
          return formattedKm;
      }
      let formattedMeters = meters + " m";
      return formattedMeters;
  },

  generateUUID: function(){
    return uuid.v4();
  }
};
