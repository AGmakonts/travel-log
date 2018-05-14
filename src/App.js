import 'antd/dist/antd.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import './App.css';
import firebase from './config/firebase.js';
import Journal from './modules/journal/component/journal';

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth',{ isSignedIn: !!user, userProfile: user });
    });
  }

  render() {
    return (
      <Journal/>
    );
  }
}

export default withRouter(connect()(App));
