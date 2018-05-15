import 'antd/dist/antd.css';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router';
import './App.css';
import firebase from './config/firebase.js';
import Login from './modules/authentication/component/login';
import PrivateRoute from './modules/authentication/component/privateRoute';
import Journal from './modules/journal/component/journal';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth', {isSignedIn: !!user, userProfile: user});
    });
  }

  render() {
    return (
      <Fragment>
        <Route render={() => <Redirect to={{pathname: '/journal'}}/>} path='/' exact/>
        <PrivateRoute exact component={Login} path='/login' redirect='/journal' invert/>
        <PrivateRoute component={Journal} path={'/journal'} redirect='/login'/>
      </Fragment>
    );
  }
}

export default withRouter(connect()(App));
