import {Button, Divider, Icon, Timeline} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cancel from '../../../../actions/trip/create/cancel';
import changeChapterDates from '../../../../actions/trip/create/changeChapterDates';
import changeChapterLocation from '../../../../actions/trip/create/changeChapterLocation';
import changeChapterSummary from '../../../../actions/trip/create/changeChapterSummary';
import save from '../../../../actions/trip/create/save';
import start from '../../../../actions/trip/create/start';
import switchTabInChapter from '../../../../actions/trip/create/switchTabInChapter';
import Chapter from './chapter';
import styles from './creator.css';

class Creator extends React.Component {

  handleMapClick = (event, index) => {
    const {lat, lng} = event;
    this.props.changeChapterLocation(lat, lng, index);
  };

  handleDateChange = (dates, index) => {
    this.props.changeChapterDates(dates[0].toDate(), dates[1].toDate(), index);
  };

  handleTabChange = (key, index) => {
    this.props.switchTabInChapter(key, index);
  };

  handleSummaryUpdate = (summary, index) => {
    this.props.changeChapterSummary(summary, index);
  };

  componentWillUnmount() {
    this.props.cancel()
  }

  componentWillMount() {
    this.props.start(0);
  }

  renderChapters() {

    const timelineElements = [];
    const chapterLocations = this.props.newTrip.chapterLocations;
    chapterLocations.forEach((location, index) => {
      timelineElements.push(
        <Timeline.Item key={`chapter-${index}`} dot={<Icon type="environment" style={{fontSize: '16px'}}/>}>
          <Chapter
            index={index}
            restrictedDates={this.props.newTrip.chapterDates[index - 1] ? this.props.newTrip.chapterDates[index - 1].end : null}
            coordinates={this.props.newTrip.chapterLocations[index]}
            currentTab={this.props.newTrip.chapterTabs[index]}
            summary={this.props.newTrip.chapterSummaries[index]}
            onLocationChange={this.handleMapClick}
            onDateChange={this.handleDateChange}
            onTabChange={this.handleTabChange}
            onSummaryUpdate={this.handleSummaryUpdate}
          />

        </Timeline.Item>
      );

      timelineElements.push(
        <Timeline.Item key={`space-${index}`} dot={<Icon type="arrow-down" style={{fontSize: '16px'}}/>} color="black">
          <div onClick={() => this.props.start(index + 1)}>
            <Divider dashed><Icon type="plus-circle-o"/> Add chapter</Divider>
          </div>
        </Timeline.Item>
      );

    });

    return timelineElements;
  }

  render() {

    return (
      <div>
        <h2 className={styles.toolbar}>
          Create new trip!
          <div>
            <Button type="danger" shape="circle" icon="delete" size='large'/>
            <Button type="primary" shape="circle" icon="save" size='large'
              onClick={() => this.props.save(this.props.newTrip)}/>
          </div>
        </h2>

        <Timeline>
          <Timeline.Item>
            <Divider dashed><Icon type="plus-circle-o"/> Add travel info</Divider>
          </Timeline.Item>
          {this.renderChapters()}
        </Timeline>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeChapterLocation,
    changeChapterDates,
    changeChapterSummary,
    switchTabInChapter,
    cancel,
    start,
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
  changeChapterSummary: propTypes.func,
  switchTabInChapter: propTypes.func,
  newTrip: propTypes.object,
  cancel: propTypes.func.isRequired,
  start: propTypes.func.isRequired,
  save: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);