import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeChapterLocation from '../../../../actions/trip/create/changeChapterLocation';
import Chapter from './chapter';


class Creator extends React.Component {

  handleMapClick = (event) => {
    const {lat, lng} = event;
    this.props.changeChapterLocation(lat, lng, 0);
  };


  render() {

    return (
      <div>
        <h2>Create new trip!</h2>
        <Chapter coordinates={this.props.chapterLocations[0]} onLocationChange={this.handleMapClick}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeChapterLocation
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
  chapterLocations: propTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);