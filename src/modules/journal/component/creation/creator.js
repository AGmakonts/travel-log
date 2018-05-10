import {Button, Divider, Icon} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cancel from '../../../../actions/trip/create/cancel';
import changeChapterDates from '../../../../actions/trip/create/changeChapterDates';
import changeChapterLocation from '../../../../actions/trip/create/changeChapterLocation';
import save from '../../../../actions/trip/create/save';
import Chapter from './chapter';
import styles from './creator.css';

class Creator extends React.Component {

  handleMapClick = (event) => {
    const {lat, lng} = event;
    this.props.changeChapterLocation(lat, lng, 0);
  };

  handleDateChange = (dates) => {
    this.props.changeChapterDates(dates[0].toDate(), dates[1].toDate());
  };

  componentWillUnmount() {
    this.props.cancel()
  }

  render() {

    return (
      <div>
        <h2 className={styles.toolbar}>
          Create new trip!
          <div>
            <Button type="danger" shape="circle" icon="delete" size='large'/>
            <Button type="primary" shape="circle" icon="save" size='large' onClick={() => this.props.save(this.props.newTrip)}/>
          </div>
        </h2>
        <Divider dashed><Icon type="plus-circle-o"/> Add travel info</Divider>
        <Chapter coordinates={this.props.newTrip.chapterLocations[0]} onLocationChange={this.handleMapClick} onDateChange={this.handleDateChange}/>
        <Divider dashed><Icon type="plus-circle-o"/> Add chapter</Divider>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeChapterLocation,
    changeChapterDates,
    cancel,
    save
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    newTrip: state.trips.newTrip
  }
}

Creator.propTypes = {
  changeChapterLocation: propTypes.func,
  changeChapterDates: propTypes.func,
  newTrip: propTypes.object,
  cancel: propTypes.func.isRequired,
  save: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);