import React from 'react';
import Actions from '../actions/Actions';

class ActionMenu extends React.Component{

  constructor(props) {
    super(props);
    this.handleLocate = this.handleLocate.bind(this);
  }

  handleSwitchInput() {
    Actions.toggleActionbar();
  }

  handleSwitchLayer() {
    Actions.toggleLayerMenu();
  }

  handleLocate(event) {
    this.props.onLocateClicked();
  }

  render() {
    return (
      <div id="tool">
        {this.props.routeMode ? null :
        <button id="toggle-search-button" className="pack-icon-route" onClick={this.handleSwitchInput}></button>}
        <button id="toggle-layers-button" className="pack-icon-layers" onClick={this.handleSwitchLayer}></button>
        <button id="locate-button" className="pack-icon-location" onClick={this.handleLocate}></button>
      </div>
    );
  }
};

export default ActionMenu;
