import 'antd/dist/antd.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Journal from './modules/journal/component/journal';

class App extends Component {

  render() {
    return (
      <Journal/>
    );
  }
}

export default connect()(App);
