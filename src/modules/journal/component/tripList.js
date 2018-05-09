import {Badge, Menu} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import Trip from '../../../models/Trip';

export default class TripList extends React.Component {

  static CREATION_INTENT_KEY = 'CREATE_TRIP_INTENT';

  /**
   *
   * @return {Array}
   */
  renderList = () => {

    const menuElements = [];

    if (this.props.onCreation) {
      menuElements.push(<Menu.Item key={TripList.CREATION_INTENT_KEY}>Add new trip</Menu.Item>)
      menuElements.push(<Menu.Divider key='divider'/>);
    }

    const list = this.convertTripListToHierarchy();

    for (const year in list) {
      if (!list.hasOwnProperty(year)) {
        continue;
      }
      const items = this._constructItems(list, year);
      menuElements.push(<Menu.ItemGroup key={year} title={year}>{items}</Menu.ItemGroup>);
    }

    return menuElements;

  };

  /**
   *
   * @param list
   * @param year
   * @return {*}
   * @private
   */
  _constructItems(list, year) {
    return list[year].map(this._constructSingleItem);
  }

  /**
   *
   * @param trip
   * @return {*}
   * @private
   */
  _constructSingleItem(trip) {
    return (
      <Menu.Item key={trip.identifier.uuid}>
        {trip.title.value} <Badge style={{backgroundColor: '#fff', color: '#999'}} count={trip.chapterCount}/>
      </Menu.Item>);
  }

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

  /**
   *
   * @param event
   */
  menuClickHandler = (event) => {
    const {key} = event;


    if (key === TripList.CREATION_INTENT_KEY && this.props.onCreation) {
      this.props.onCreation();
    } else if (key !== undefined) {
      this.props.onSelect(key);
    }

  };

  render() {
    return (
      <Menu
        mode="inline"
        style={this.props.style}
        onClick={this.menuClickHandler}
      >
        {this.renderList()}

      </Menu>
    );
  }
}

TripList.propTypes = {
  tripList: propTypes.arrayOf(propTypes.instanceOf(Trip)).isRequired,
  style: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onCreation: propTypes.func
};
