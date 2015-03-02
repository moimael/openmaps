var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Common = require('../common');

var ActionBarInstructions = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#action-bar',

    // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
    // It is also much quicker to load this way.
    template: function(obj){
        var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
        with(obj||{}){
            __p+='<a id="back-button"><span class="icon icon-back">back</span></a>\n<h1>Instructions</h1>\n';
        }
        return __p;
    },
    
    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'click #back-button': 'goBack'
    },
    
    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

    },

    // Re-rendering the Map means detroying everything and re-creating plus re-adding all layers.
    render: function() {
        // this.$el.html(this.template());
        this.$el.before('<div class="solid"></div>');
        this.$el.children('form').attr('role', 'search');
        // this.$el.toggleClass('solid');
    },
    
    goBack:function() {
        events.trigger('actionbarinstructions:back');
    }
});

module.exports = ActionBarInstructions;

