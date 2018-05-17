import {Button} from 'antd';
import React from 'react';
import propTypes from 'prop-types';
import styles from './cover.css';
export default class Cover extends React.Component {

  render() {
    return (
      this.props.src.url ?
        <img src={this.props.src.url}/> :
        <div onClick={this.props.onSelectionIntent} className={styles.placeholder}><Button size='large' type="dashed">Select Cover photo</Button></div>
    );
  }

}

Cover.propTypes = {
  src: propTypes.string,
  onSelectionIntent: propTypes.func
};