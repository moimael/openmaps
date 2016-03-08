import React from 'react';
import Actions from '../actions/Actions';

class SearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleClear() {
    Actions.clearText();
  }

  render() {
    return (
        <p>
          <input id="search-input" type="text" placeholder={this.props.placeholder} ref="searchTextInput" autoComplete="off" value={this.props.searchText} onChange={this.handleChange}/>
          {this.props.searchText ? <button id="clear-btn" type="reset" onClick={this.handleClear}>Clear</button> : null}
        </p>
    );
  }
};

export default SearchInput;
