import {Divider, Icon} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cancel from '../../../../actions/trip/create/cancel';
import changeChapterLocation from '../../../../actions/trip/create/changeChapterLocation';
import Chapter from './chapter';


class Creator extends React.Component {

  handleMapClick = (event) => {
    const {lat, lng} = event;
    this.props.changeChapterLocation(lat, lng, 0);
  };

  componentWillUnmount() {
    this.props.cancel()
  }

  render() {

    return (
      <div>
        <h2>Create new trip!</h2>
        <Divider dashed><Icon type="plus-circle-o" /> Add travel info</Divider>
        <Chapter coordinates={this.props.chapterLocations[0]} onLocationChange={this.handleMapClick}/>
        <Divider dashed><Icon type="plus-circle-o" /> Add chapter</Divider>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeChapterLocation,
    cancel
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    chapterLocations: state.trips.newTrip.chapterLocations,
  }
}

Creator.propTypes = {
  changeChapterLocation: propTypes.func,
  chapterLocations: propTypes.array,
  cancel: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);