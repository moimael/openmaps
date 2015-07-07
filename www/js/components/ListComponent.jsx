var React = require('react');
var Spinner = require('react-spinkit');
var ListItem = require('./ListItem.jsx');

var ListComponent = React.createClass({

  handleClick: function(item) {
    this.props.onItemClicked(item);
  },

  render: function() {
    var listItem = null;

    if (this.props.items.length > 0) {
      listItem = this.props.items.map(function(item) {
        return (
          <ListItem key={item.id} item={item} onItemClicked={this.props.onItemClicked.bind(null, item)} />
        );
      }, this);
    } else {
      listItem = <Spinner spinnerName='pulse'/>;
    }

    return (
         <ul>
          {listItem}
        </ul>
    );
  }
});

module.exports = ListComponent;
