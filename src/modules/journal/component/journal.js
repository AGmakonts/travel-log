import {Layout, Menu} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
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

    return (
      <Layout>
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
              <Route path='/oauth/flickr' render={props => <div>{JSON.stringify(props)}</div>}/>
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
    selectTrip
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    tripList: state.trips.tripList,
    selected: state.trips.selected
  }
}

Journal.propTypes = {
  selectTrip: propTypes.func.isRequired,
  tripList: propTypes.array.isRequired,
  addTrip: propTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journal));