require.config({
    baseUrl: 'js/lib',
    
    // We fake jquery so that libs that "require" it don't download
    // both jquery and zepto. If you want to use jquery, remove this.
    map: { '*': { 'jquery': 'zepto' } },
    shim: {
        'mq-routing': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['mq-map'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'MQRouting'
        }
    },
    paths: { 
    	'mq-map': 'http://open.mapquestapi.com/sdk/leaflet/v1.s/mq-map.js?key=Fmjtd%7Cluub2duan9%2C8a%3Do5-9u2llr', 
    	'mq-routing': 'http://open.mapquestapi.com/sdk/leaflet/v1.s/mq-routing.js?key=Fmjtd%7Cluub2duan9%2C8a%3Do5-9u2llr'
    }
});

requirejs(['../app']);
