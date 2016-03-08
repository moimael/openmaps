import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import Typeahead from './Typeahead.jsx';
import RouteSearch from './RouteSearch.jsx';
import Toolbar from './Toolbar.jsx';
import MapComponent from './MapComponent.jsx';
import ActionMenu from './ActionMenu.jsx';
import UIStore from '../stores/UIStore';
import RouteStore from '../stores/RouteStore';
import SearchStore from '../stores/SearchStore';

@connectToStores
class App extends React.Component {

  static getStores() {
    return [UIStore, RouteStore];
  }

  static getPropsFromStores() {
    return {
      ...UIStore.getState(),
      ...RouteStore.getState(),
      ...SearchStore.getState()
    }
  }

  constructor(props) {
    super(props);
    this.handleLocateClicked = this.handleLocateClicked.bind(this);
  }

  componentDidMount() {
    this.handleLocateClicked();
  }

  handleLocateClicked() {
    this.refs.mapComponent.locate();
  }

  getCurrentBoundsCenter() {
    if (this.refs.mapComponent !== undefined) {
      return this.refs.mapComponent.getBoundsCenter();
    }
    return this.props.userPosition;
  }

  render() {
    var { searchText, showSuggestions, locations, ...other } = this.props;
    let buttons = [
      {
        'id': 'map-view-button',
        'value': 'road',
        'text': 'Map'
      },
      {
        'id': 'satellite-view-button',
        'value': 'satellite',
        'text': 'Satellite'
      },
      {
        'id': 'cycle-view-button',
        'value': 'cycle',
        'text': 'Cycle'
      }
    ];

    return (
      <div role="main">
        {this.props.showRoutingWidget ?
        <RouteSearch routeStartText={this.props.routeStartText} routeEndText={this.props.routeEndText} showSuggestions={showSuggestions} showInstructions={this.props.showInstructions} locations={locations} route={this.props.route} hasRoute={this.props.hasRoute} map={this.refs.mapComponent}/> :
        <Typeahead searchText={searchText} showSuggestions={showSuggestions} locations={locations} bounds={this.getCurrentBoundsCenter()} />
        }

        <Toolbar routeMode={this.props.showRoutingWidget} onLocateClicked={this.handleLocateClicked}/>
        <MapComponent {...other} id="map" ref="mapComponent" />
        {this.props.showLayerMenu ?
        <ActionMenu title="Layers" items={buttons} /> : null}
      </div>
    );
  }
};

export default App;
