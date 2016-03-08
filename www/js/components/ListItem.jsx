import React from 'react';

class ListItem extends React.Component{
  static propTypes = {
    item: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onItemClicked(this.props.item);
  }

  render() {
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
};

export default ListItem;
