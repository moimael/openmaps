var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var AutocompleteItem = Backbone.View.extend({

    tagName: 'li',

    // Pre-compiled template. They cannot be generate on the fly because of Content Security Policy.
    // It is also much quicker to load this way.
    template: function(obj){
        var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
        with(obj||{}){
            __p+='<a href="#"><p>'+
            ((__t=( name ))===null?'':__t)+
            '</p><p>'+
            ((__t=( state ))===null?'':__t)+
            ', '+
            ((__t=( country ))===null?'':__t)+
            '</p></a>';
        }
        return __p;
    },

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'click a': 'completeSearch'
    },

    render: function() {
        var html = this.template(this.model.toJSON());
        $(this.el).append(html);
    },

    completeSearch: function(e) {
        events.trigger("search:completed", this.model);
    }
});

module.exports = AutocompleteItem;
