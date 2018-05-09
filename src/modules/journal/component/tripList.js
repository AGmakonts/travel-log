import propTypes from 'prop-types';
import Trip from '../../../models/Trip';
import {Badge, Menu} from 'antd';
import React from 'react';

const {SubMenu} = Menu;


export default class TripList extends React.Component {

  /**
   *
   * @return {Array}
   */
  renderList = () => {

    const menuElements = [];
    const list = this.convertTripListToHierarchy();

    for (const year in list) {

      if (!list.hasOwnProperty(year)) {
        continue;
      }

      const items = list[year].map((trip: Trip) => {
        return <Menu.Item key={trip.identifier.uuid}>
          {trip.title.value} <Badge style={{backgroundColor: '#fff', color: '#999'}} count={trip.chapterCount}/>
        </Menu.Item>
      });

      menuElements.push(<SubMenu key={year} title={year}>{items}</SubMenu>);
    }

    return menuElements;

  };

  /**
   *
   */
  convertTripListToHierarchy() {
    const list = {};

    this.props.tripList.forEach((tripListItem: Trip) => {
      const year = tripListItem.date.getFullYear();
      if (!list.hasOwnProperty(year)) {
        list[year] = [];
      }

      list[year].push(tripListItem);
    });
    return list;
  }

  render() {
    return (
      <Menu
        mode="inline"
        style={this.props.style}
        onClick={event => this.props.onSelect(event.key)}
      >
        {this.renderList()}

      </Menu>
    );
  }
}

TripList.propTypes = {
  tripList: propTypes.arrayOf(propTypes.instanceOf(Trip)).isRequired,
  style: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired
};
