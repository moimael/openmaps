require.config({
    baseUrl: 'js/lib',
    
    // We fake jquery so that libs that "require" it don't download
    // both jquery and zepto. If you want to use jquery, remove this.
    map: { '*': { 'jquery': 'zepto' } },
    shim: {
        'zepto': {
            exports: '$'
        },
        'leaflet-routing-machine': {
            deps: ['leaflet'],
            exports: 'RoutingMachine'
        },
        'bloodhound': {
            deps: ['zepto'],
            exports: 'Bloodhound'
        },
    }
});

requirejs(['../app']);
