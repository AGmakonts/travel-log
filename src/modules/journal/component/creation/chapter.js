import {Card, DatePicker, Icon} from 'antd';
import moment from 'moment';
import propTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchAddressDetails from '../../../../actions/trip/create/location/fetchAddressDetails';
import switchTabInChapter from '../../../../actions/trip/create/switchTabInChapter';
import updateChapter from '../../../../actions/trip/create/updateChapter';
import ChapterModel from '../../../../models/Chapter';
import styles from './chapter.css';
import BasicInfo from './chapterParts/basicInfo';
import Cover from './chapterParts/cover';
import Map from './chapterParts/map';

const {RangePicker} = DatePicker;


class Chapter extends React.Component {

  /**
   *
   * @return {ChapterModel|*}
   */
  get chapterInstance(): ChapterModel {
    return this.props.newTrip.chapters[this.props.index];
  }

  get chapter() {
    return {
      currentTab: this.props.newTrip.chapterTabs[this.props.index] || 'basic'
    }
  }

  /**
   *
   */
  componentDidMount() {
    this.updateChapter(this.chapterInstance.withDates(new Date, new Date));
  }

  updateChapter = (chapter: ChapterModel) => {
    this.props.updateChapter(chapter, this.props.index);
  };

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
      basic: <BasicInfo summary={this.chapterInstance.summary} onChange={event => {
        this.updateChapter(this.chapterInstance.withSummary(event))
      }}/>,
      editor: <p>content2</p>
    };

    const actions = [<Icon key={1} type="save"/>];
    const map = (
      <Map onClick={(lat, lng) => this.props.fetchAddressDetails(this.chapterInstance, lat, lng, this.props.index)}
        coordinates={this.chapterInstance.location}/>
    );

    const cover = (
      <Cover onSelectionIntent={() => this.props.openPhotoBrowser(this.props.index, 'cover')}/>
    );

    const title = (
      <div className={styles.title}>
        {coordinates.formatted || 'Add chapter!'}
        <RangePicker disabledDate={this.disabledDate} defaultValue={[moment(), moment()]}
          onChange={event => {
            this.updateChapter(this.chapterInstance.withDates(event[0], event[1]));
          }}/>
      </div>
    );

    return (
      <Fragment>

        <Card
          cover={this.chapter.currentTab === 'basic' ? map : cover}
          actions={actions}
          title={title}
          tabList={tabList}
          onTabChange={event => this.props.switchTabInChapter(event, this.props.index)}
          defaultActiveTabKey='basic'
          activeTabKey={this.chapter.currentTab}
        >
          {contentList[this.chapter.currentTab]}
        </Card>
      </Fragment>
    );
  }

}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchAddressDetails,
    switchTabInChapter,
    updateChapter
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
  fetchAddressDetails: propTypes.func.isRequired,
  updateChapter: propTypes.func.isRequired,
  switchTabInChapter: propTypes.func.isRequired,
  openPhotoBrowser: propTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(Chapter);