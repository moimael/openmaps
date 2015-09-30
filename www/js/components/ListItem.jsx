var React = require('react');

var ListItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    this.props.onItemClicked(this.props.item);
  },

  render: function () {
    return (
      <li onClick={this.handleClick}>
        {this.props.item.imgClass ?
        <aside className={"leaflet-routing-icon " + this.props.item.imgClass}></aside> : null}
        <a href="#">
          <p>{this.props.item.mainText}</p>
          <p>{this.props.item.subText}</p>
        </a>
      </li>
    );
  }
});

module.exports = ListItem;
