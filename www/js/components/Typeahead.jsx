import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchInput from './SearchInput.jsx';
import ListComponent from './ListComponent.jsx';
import Actions from '../actions/Actions';
import SearchActions from '../actions/SearchActions';


class Typeahead extends React.Component{

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    SearchActions.fetchResults(value, this.props.bounds);
  }

  handleSearchCompleted(location) {
    Actions.showLocation(location);
  }

  render() {
    return (
      <div className="autocomplete">
        <div className="action-bar">
          <form action="#">
            <SearchInput placeholder="Enter search terms" searchText={this.props.searchText} onChange={this.handleChange} />
          </form>
        </div>
        <ReactCSSTransitionGroup className="transitionGroup" transitionName="pull" transitionEnterTimeout={1100} transitionLeaveTimeout={500}>
        { this.props.showSuggestions ?
          <section key="1" className="card" data-type="list">
            <ListComponent items={this.props.locations} onItemClicked={this.handleSearchCompleted} />
          </section> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

export default Typeahead;
