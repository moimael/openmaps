var React = require('react');
var Actions = require('../actions/Actions');

var SearchInput = React.createClass({

  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },

  handleClear: function() {
    Actions.clearText();
  },

  render: function() {
    return (
        <p>
          <input id="search-input" type="text" placeholder={this.props.placeholder} ref="searchTextInput" autoComplete="off" value={this.props.searchText} onChange={this.handleChange}/>
          <button id="clear-btn" type="reset" onClick={this.handleClear}>Clear</button>
        </p>
    );
  }
});

module.exports = SearchInput;