import React from 'react';
import Actions from '../actions/Actions';

class ActionMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeLayer = this.handleChangeLayer.bind(this);
  }

  handleChangeLayer(event) {
    Actions.changeLayer(event.target.value);
    this.handleClose();
  }

  handleClose() {
    Actions.toggleLayerMenu();
  }

  render() {
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
}

export default ActionMenu;
