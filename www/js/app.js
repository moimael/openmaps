var $ = require('jquery');
var React = require('react');
var App = require('./components/App.jsx');


React.initializeTouchEvents(true);

// ajax global settings
$.ajaxSetup( {
  xhr: function() {
    return new window.XMLHttpRequest({
        mozSystem: true
    });
  }
});

var app = React.render(<App />, document.getElementById('app'));

module.exports = app;
