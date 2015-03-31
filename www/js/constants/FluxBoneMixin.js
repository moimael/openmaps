module.exports = {
  ModelMixin: function(model_name, event_name) {
    var eventCallbackName, mixin;
    if (event_name === null) {
      event_name = "all";
    }
    eventCallbackName = "_eventCallbacks_" + model_name + "_" + event_name;
    mixin = {
      componentDidMount: function() {
        return this.props[model_name].on(event_name, this[eventCallbackName], this);
      },
      componentWillUnmount: function() {
        return this.props[model_name].off(event_name, this[eventCallbackName], this);
      }
    };
    mixin[eventCallbackName] = function() {
      return setTimeout((function(_this) {
        return function() {
          return _this.forceUpdate();
        };
      })(this), 0);
    };
    return mixin;
  },
  CollectionMixin: function(collection_name, event_name) {
    var eventCallbackName, mixin;
    if (event_name === null) {
      event_name = "all";
    }
    eventCallbackName = "_eventCallbacks_" + collection_name + "_" + event_name;
    mixin = {
      componentDidMount: function() {
        return this.props[collection_name].on(event_name, this[eventCallbackName], this);
      },
      componentWillUnmount: function() {
        return this.props[collection_name].off(event_name, this[eventCallbackName], this);
      }
    };
    mixin[eventCallbackName] = function() {
      return setTimeout((function(_this) {
        return function() {
          return _this.forceUpdate();
        };
      })(this), 0);
    };
    return mixin;
  }
};
