import {Dropdown, Icon, Layout, Menu, Modal} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import toggle from '../../../actions/settings/toggle';
import addTrip from '../../../actions/trip/add';
import selectTrip from '../../../actions/trip/select';
import Trip from '../../../models/Trip';
import Creator from './creation/creator';
import TripDetails from './tripDetails';
import TripList from './tripList';

const {Header, Content, Sider} = Layout;

class Journal extends React.Component {
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
        <Modal
          title="Your Travel Log settings"
          visible={this.props.settingsVisible}
          onCancel={this.props.toggleSettings}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
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
                {this.props.currentUser.displayName} <Icon type="down" />
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
              <Route path='/newTrip' component={Creator}/>
              <Route path='/trip/:id/:name' render={this._getConfiguredTripDetailsComponent}/>
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
    toggleSettings: toggle
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    tripList: state.trips.tripList,
    selected: state.trips.selected,
    currentUser: state.currentUser,
    settingsVisible: !!state.settings.visible
  }
}

Journal.propTypes = {
  selectTrip: propTypes.func.isRequired,
  tripList: propTypes.array.isRequired,
  addTrip: propTypes.func.isRequired,
  currentUser: propTypes.object.isRequired,
  settingsVisible: propTypes.bool.isRequired,
  toggleSettings: propTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journal));