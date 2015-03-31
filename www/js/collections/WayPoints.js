var _ = require('underscore');
var Backbone = require('backbone');
var Location = require('../models/Location');

var WayPoints = Backbone.Collection.extend({

  model: Location

});

module.exports = new WayPoints();