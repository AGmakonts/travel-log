import {Input} from 'antd/lib/index';
import propTypes from 'prop-types';
import React from 'react';

const {TextArea} = Input;


export default class BasicInfo extends React.Component {
  render () {
    return (
      <TextArea value={this.props.summary}
        onChange={(event) => this.props.onChange(event.target.value)}
        placeholder="Chapter summary" autosize={{minRows: 2}}/>
    );
  }
}


BasicInfo.propTypes = {
  summary: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};