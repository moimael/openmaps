define([
'zepto',
'underscore',
'backbone',
'bloodhound',
'./Location'
], function($, _, Backbone, Bloodhound, Location) {
//network info api
//send event -> notification api to notify user if no network

    var Search = Backbone.Model.extend({
        defaults: {
            credentials: '',
            type: 'search',
            engine: null
        },
        
        getCredentials: function() {
            return this.credentials;
        },
        
        getType: function() {
            return this.type;
        },
        
        setCredentials: function(credentials) {
            this.credentials = credentials;
            this.startSuggestionEngine();
        },

        startSuggestionEngine: function() {
            this.engine = new Bloodhound({
              name: 'locations',
              remote: {url: 'https://photon.komoot.de/api/?q=%QUERY&limit=8'}, //, ajax: {data: {key: this.credentials} }
              datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.val);
              },
              queryTokenizer: Bloodhound.tokenizers.whitespace
            });
            var promise = this.engine.initialize();
            promise
            .done(function() {
                console.log('success!');
            })
            .fail(function() {
                console.log('err!');
            });
        },
        
        validate: function(attrs) {
            if ( _.isEmpty(attrs.credentials) ) {
                return "Missing Credentials";
            }
        },
        
        findLocation : function(location, callback) {
            this.engine.get(location, function(suggestions) {
              callback(suggestions);
            });
        }

    });

    return Search;
  
});
