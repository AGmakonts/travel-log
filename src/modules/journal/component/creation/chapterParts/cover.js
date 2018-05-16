import {Button} from 'antd';
import React from 'react';
import propTypes from 'prop-types';
export default class Cover extends React.Component {

  render() {
    return (
      this.props.src ?
        <img src={this.props.src}/> :
        <div><Button onClick={this.props.onSelectionIntent}>Select Cover photo</Button></div>
    );
  }

}

Cover.propTypes = {
  src: propTypes.string,
  onSelectionIntent: propTypes.func
};