module.exports = function() {
    return {
        // What is the enter key constant?
        ENTER_KEY: 13,
        
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
        }
    };
};
