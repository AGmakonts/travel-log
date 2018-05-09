import React from 'react';
import {Badge, Breadcrumb, Layout, Menu} from 'antd';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import addTrip from '../../../actions/trip/add';
import {bindActionCreators} from 'redux';
import Location from '../../../models/Location';
import Chapter from '../../../models/Chapter';
import Trip from '../../../models/Trip';
import Identifier from '../../../models/Identifier';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class Journal extends React.Component {

  itemClickHandler = (event) => {
    const {key} = event;

    const countries = ['Israel', 'Poland', 'Jordan', 'USA', 'Germany', 'Russia', 'France', 'Malta', 'Mexico'];

    const atlit = new Location(countries[Math.floor(Math.random() * countries.length)], 'Atlit');
    const chapterAtlit = new Chapter(new Date(2017, 1, 1), new Date(2017, 1, 1), atlit);

    const eilat = new Location(countries[Math.floor(Math.random() * countries.length)], 'Eilat');
    const chapterEilat = new Chapter(new Date(2017, 1, 1), new Date(2018, 1, 1), eilat);

    const warsaw = new Location(countries[Math.floor(Math.random() * countries.length)], 'Warsaw');
    const chapterWarsaw = new Chapter(new Date(2017, 1, 1), new Date(2018, 1, 1), warsaw);

    const a = new Location(countries[Math.floor(Math.random() * countries.length)], 'Warsaw');
    const b = new Chapter(new Date(2017, 1, 1), new Date(2018, 1, 1), a);

    const c = new Location(countries[Math.floor(Math.random() * countries.length)], 'Warsaw');
    const d = new Chapter(new Date(2017, 1, 1), new Date(2018, 1, 1), c);


    const e = new Location(countries[Math.floor(Math.random() * countries.length)], 'Warsaw');
    const f = new Chapter(new Date(2017, 1, 1), new Date(2018, 1, 1), e);


    const trip = new Trip(new Identifier(), [chapterAtlit, chapterEilat, chapterWarsaw, b, d, f]);

    this.props.addTrip(trip);
  };

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
        return <Menu.Item key={trip.identifier.uuid}>{trip.title.value} <Badge
          style={{backgroundColor: '#fff', color: '#999'}} count={trip.chapterCount}/></Menu.Item>
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

  /**
   *
   * @return {*}
   */
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}
            onClick={this.itemClickHandler}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={400} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%', borderRight: 0}}
            >
              {this.renderList()}

            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addTrip: addTrip}, dispatch);
}

function mapStateToProps(state) {
  return {
    tripList: state.trips.tripList
  }
}

Journal.propTypes = {
  tripList: propTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Journal);