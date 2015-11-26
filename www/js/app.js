var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.jsx');


// ajax global settings
$.ajaxSetup( {
  xhr: function() {
    return new window.XMLHttpRequest({
        mozSystem: true,
        mozAnon: true
    });
  }
});

var app = ReactDOM.render(<App />, document.getElementById('app'));

module.exports = app;
