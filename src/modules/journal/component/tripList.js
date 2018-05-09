import {Badge, Menu} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import Title from '../../../models/title/Title';
import Trip from '../../../models/Trip';

export default class TripList extends React.Component {

  static CREATION_INTENT_KEY = 'CREATE_TRIP_INTENT';

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

    const identifier: String = trip.identifier.uuid;
    const title: Title = trip.title;

    return (
      <Menu.Item key={identifier}>
        <Link to={`/trip/${identifier}/${title.slug}`}>
          {title.value} <Badge style={{backgroundColor: '#fff', color: '#999'}} count={trip.chapterCount}/>
        </Link>
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


  render() {
    return (
      <Menu
        mode="inline"
        style={this.props.style}
      >
        <Menu.Item key={TripList.CREATION_INTENT_KEY}><Link to='/newTrip'>Add new trip</Link></Menu.Item>
        <Menu.Divider key='divider'/>

        {this.renderList()}

      </Menu>
    );
  }
}

TripList.propTypes = {
  tripList: propTypes.arrayOf(propTypes.instanceOf(Trip)).isRequired,
  style: propTypes.object.isRequired
};
