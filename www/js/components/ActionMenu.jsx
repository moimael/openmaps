var React = require('react');
var Actions = require('../actions/Actions');

var ActionMenu = React.createClass({

  handleChangeLayer: function(event) {
    Actions.changeLayer(event.target.value);
    this.handleClose();
  },

  handleClose: function() {
    Actions.toggleLayerMenu();
  },

  render: function() {
    let buttons = null;
    buttons = this.props.items.map((button) => {
      return (
        <button type="button" key={button.id} id={button.id} value={button.value} onClick={this.handleChangeLayer}>{button.text}</button>
      );
    });
    return (
      <div id="action-menu">
        <form data-type="action" role="dialog">
          <header>{this.props.title}</header>
          <menu>
            {buttons}
            <button type="button" id="cancel-button" onClick={this.handleClose}>Cancel</button>
          </menu>
        </form>
      </div>
    );
  }
});

module.exports = ActionMenu;
