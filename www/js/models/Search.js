define([
'underscore',
'backbone', 
'./Location'
], function(_, Backbone, Location) {
//network info api
//send event -> notification api to notify user if no network

    var Search = Backbone.Model.extend({
        defaults: {
            credentials: '',
            type: 'search'
        },
        
        getCredentials: function() {
            return this.credentials;
        },
        
        getType: function() {
            return this.type;
        },
        
        setCredentials: function(credentials) {
            this.credentials = credentials;
        },
        
        validate: function(attrs) {
            if ( _.isEmpty(attrs.credentials) ) {
                return "Missing Credentials";
            }
        },
        
        findLocation : function(location, callback) {
            $.ajax({
                type: 'GET',
                url: 'http://where.yahooapis.com/geocode',
                // data to be added to query string:
                data: { location: location, flags: 'J', appid: this.credentials },
                // type of data we are expecting in return:
                dataType: 'jsonp',
                success: function(data){
                    callback(data);
                },
                error: function(xhr, type){
                    console.log('Ajax error!');
                }
            });
        }

    });

    return Search;
  
});
