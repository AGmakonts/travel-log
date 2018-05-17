import {Avatar, Dropdown, Icon, Layout, Menu} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import fetchAirports from '../../../actions/airports/fetchAirports';
import fetchAccountsSettings from '../../../actions/settings/connectedAccounts/fetchAccountsSettings';
import toggle from '../../../actions/settings/toggle';
import addTrip from '../../../actions/trip/add';
import selectTrip from '../../../actions/trip/select';
import Trip from '../../../models/Trip';
import Settings from '../../settings/settings';
import Creator from './creation/creator';
import TripDetails from './tripDetails';
import TripList from './tripList';

const {Header, Content, Sider} = Layout;

class Journal extends React.Component {


  componentDidMount() {
    this.props.fetchAccountsSettings(this.props.currentUser.uid);
    this.props.fetchAirports();
  }

  /**
   *
   * @return {*}
   */
  render() {

    const tripList = <TripList style={{height: '100%', borderRight: 0}} tripList={this.props.tripList}/>;
    const menu = (
      <Menu>
        <Menu.Item onClick={this.props.toggleSettings}>Settings</Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Logout</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>

        <Settings onCancel={this.props.toggleSettings} currentUser={this.props.currentUser}/>
        <Header className="header">
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                <Avatar shape="square" src={this.props.currentUser.photoURL}/> {this.props.currentUser.displayName}
                <Icon type="down"/>
              </a>
            </Dropdown>
          </Menu>
        </Header>
        <Layout>
          <Sider width={400} style={{background: '#fff'}}>
            {tripList}
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              <Route path='/journal/newTrip' component={Creator}/>
              <Route path='/journal/trip/:id/:name' render={this._getConfiguredTripDetailsComponent}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  _getConfiguredTripDetailsComponent = (props) => {
    const trip = this._findTrip(props);
    return trip ? <TripDetails {...props} trip={trip}/> : <div>loading</div>
  };

  _findTrip(props) {
    return this.props.tripList.find((trip: Trip) => {
      return trip.identifier.uuid === props.match.params.id
    });
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    addTrip,
    selectTrip,
    toggleSettings: toggle,
    fetchAccountsSettings,
    fetchAirports
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    tripList: state.trips.tripList,
    selected: state.trips.selected,
    currentUser: state.currentUser
  }
}

Journal.propTypes = {
  selectTrip: propTypes.func.isRequired,
  fetchAccountsSettings: propTypes.func.isRequired,
  fetchAirports: propTypes.func.isRequired,
  tripList: propTypes.array.isRequired,
  addTrip: propTypes.func.isRequired,
  currentUser: propTypes.object.isRequired,
  toggleSettings: propTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journal));