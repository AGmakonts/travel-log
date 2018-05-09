import React from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import addTrip from '../../../actions/trip/add';
import {bindActionCreators} from 'redux';
import Location from '../../../models/Location';
import Chapter from '../../../models/Chapter';
import Trip from '../../../models/Trip';
import Identifier from '../../../models/Identifier';
import TripList from './tripList';
import selectTrip from '../../../actions/trip/select';

const {Header, Content, Sider} = Layout;

class Journal extends React.Component {

  itemClickHandler = () => {

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

  tripSelectionHandler = (identifier) => {
    this.props.selectTrip(identifier);
  };

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
            <TripList style={{height: '100%', borderRight: 0}} tripList={this.props.tripList}
                      onSelect={this.tripSelectionHandler}/>
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
  const actionCreators = {
    addTrip,
    selectTrip
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    tripList: state.trips.tripList,
    selectedTrip: state.trips.selected
  }
}

Journal.propTypes = {
  tripList: propTypes.array.isRequired,
  selectedTrip: propTypes.string,
  selectTrip: propTypes.func.isRequired,
  addTrip: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Journal);