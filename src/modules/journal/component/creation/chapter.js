import {Card, DatePicker, Icon} from 'antd';
import moment from 'moment';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeChapterDates from '../../../../actions/trip/create/changeChapterDates';
import changeChapterLocation from '../../../../actions/trip/create/changeChapterLocation';
import changeChapterSummary from '../../../../actions/trip/create/changeChapterSummary';
import switchTabInChapter from '../../../../actions/trip/create/switchTabInChapter';
import styles from './chapter.css';
import BasicInfo from './chapterParts/basicInfo';
import Map from './chapterParts/map';

const {RangePicker} = DatePicker;


class Chapter extends React.Component {

  get chapter() {
    return {
      dates: this.props.newTrip.chapterDates[this.props.index],
      locations: this.props.newTrip.chapterLocations[this.props.index],
      summary: this.props.newTrip.chapterSummaries[this.props.index],
      currentTab: this.props.newTrip.chapterTabs[this.props.index] || 'basic'
    }
  }

  /**
   *
   */
  componentDidMount() {
    this.props.changeChapterDates(this.chapter.dates.start, this.chapter.dates.end, this.props.index);
  }

  /**
   *
   * @param current
   * @return {*|boolean}
   */
  disabledDate = (current) => {
    return current && current < this.props.restrictedDates;
  };

  /**
   *
   * @return {*}
   */
  render() {

    const coordinates = this.chapter.locations;

    const tabList = [{
      key: 'basic',
      tab: 'Basic info'
    }, {
      key: 'editor',
      tab: 'Chapter editor'
    }];

    const contentList = {
      basic: <BasicInfo summary={this.chapter.summary}
        onChange={event => this.props.changeChapterSummary(event, this.props.index)}/>,
      editor: <p>content2</p>
    };

    const actions = [<Icon key={1} type="save"/>];
    const map = (
      <Map onClick={(lat, lng) => this.props.changeChapterLocation(lat, lng, this.props.index)}
        coordinates={this.chapter.locations}/>
    );

    const title = (
      <div className={styles.title}>
        {coordinates.formatted || 'Add chapter!'}
        <RangePicker disabledDate={this.disabledDate} defaultValue={[moment(), moment()]}
          onChange={event => this.props.changeChapterDates(event[0], event[1], this.props.index)}/>
      </div>
    );

    return (
      <Card
        cover={map}
        actions={actions}
        title={title}
        tabList={tabList}
        onTabChange={event => this.props.switchTabInChapter(event, this.props.index)}
        defaultActiveTabKey='basic'
        activeTabKey={this.chapter.currentTab}
      >
        {contentList[this.chapter.currentTab]}
      </Card>
    );
  }

}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeChapterLocation,
    changeChapterDates,
    changeChapterSummary,
    switchTabInChapter
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    newTrip: state.trips.newTrip
  }
}

Chapter.propTypes = {
  index: propTypes.number,
  newTrip: propTypes.object,
  restrictedDates: propTypes.object,
  changeChapterLocation: propTypes.func.isRequired,
  changeChapterDates: propTypes.func.isRequired,
  changeChapterSummary: propTypes.func.isRequired,
  switchTabInChapter: propTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Chapter);