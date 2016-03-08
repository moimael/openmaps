import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';


// ajax global settings
$.ajaxSetup( {
  xhr: function() {
    return new window.XMLHttpRequest({
        mozSystem: true
    });
  }
});

let app = ReactDOM.render(<App />, document.getElementById('app'));

export default app;
