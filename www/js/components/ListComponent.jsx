import React from 'react';
import Spinner from 'react-spinkit';
import ListItem from './ListItem.jsx';

class ListComponent extends React.Component{
  static propTypes = {
    items: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.onItemClicked(item);
  }

  render() {
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
};

export default ListComponent;
