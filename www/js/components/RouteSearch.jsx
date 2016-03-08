import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchInput from './SearchInput.jsx';
import ListComponent from './ListComponent.jsx';
import Actions from '../actions/Actions';


class RouteSearch extends React.Component{

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  handleRouteStartChange(value) {
    Actions.fetchStartLocations(value);
  }

  handleRouteEndChange(value) {
    Actions.fetchEndLocations(value);
  }

  handleSearchCompleted(location) {
    Actions.confirmLocation(location);
  }

  toggleInstructions() {
    Actions.toggleInstructions();
  }

  goBack() {
    this.props.map.clearRoutes();
    Actions.goBack();
  }

  doNothing() {
  }

// <div className="hbox center"><button><span className="icon icon-back">back</span></button><button><span className="icon icon-back">back</span></button><button><span className="icon icon-back">back</span></button></div>
  render() {
    return (
      <div className="routing-autocomplete">
        <section role="region" className="skin-dark route-header">
          <header>
            <button onClick={this.goBack}><span className="icon icon-back">back</span></button>
            <menu type="toolbar">
              <button onClick={this.toggleInstructions}  disabled={this.props.hasRoute ? null : "disabled"}><span className="icon icon-menu">menu</span></button>
            </menu>
            <h1>{this.props.hasRoute ? this.props.route.totalDistance + ', ' +  this.props.route.totalTime : "Route"}</h1>
          </header>
        </section>
        <div className="routing-bar">
          <form action="#">
            <SearchInput placeholder="Start" searchText={this.props.routeStartText} onChange={this.handleRouteStartChange} />
            <SearchInput placeholder="End" searchText={this.props.routeEndText} onChange={this.handleRouteEndChange} />
          </form>
        </div>
        <ReactCSSTransitionGroup className="transitionGroup" transitionName="pull" transitionEnterTimeout={1100} transitionLeaveTimeout={500}>
        { this.props.showSuggestions ?
          <section key="2" className="card" data-type="list">
            <ListComponent items={this.props.locations} onItemClicked={this.handleSearchCompleted}/>
          </section> : null }
        { this.props.showInstructions ?
          <section key="3" className="card" data-type="list">
            <ListComponent items={this.props.route.instructions} onItemClicked={this.doNothing}/>
          </section> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

export default RouteSearch;
