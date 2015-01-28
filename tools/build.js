({
    baseUrl: "js/lib",
    map: { '*': { 'jquery': 'zepto' } },
    shim: {
        'zepto': {
            exports: 'Zepto'
        },
        'leaflet-routing-machine': {
            deps: ['leaflet'],
            exports: 'RoutingMachine'
        }
    },
    optimize: "uglify2",
    preserveLicenseComments: false,
    useStrict: true,
    dir: "../www-built",
    appDir: "../www",
    removeCombined: true,
    modules: [
        { name: "../app" }
    ]
})