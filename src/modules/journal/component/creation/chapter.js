import {Card, DatePicker, Icon} from 'antd';
import moment from 'moment';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeChapterDates from '../../../../actions/trip/create/changeChapterDates';
import changeChapterSummary from '../../../../actions/trip/create/changeChapterSummary';
import fetchAlbums from '../../../../actions/trip/create/flickr/albums/fetchAlbums';
import fetchAddressDetails from '../../../../actions/trip/create/location/fetchAddressDetails';
import switchTabInChapter from '../../../../actions/trip/create/switchTabInChapter';
import styles from './chapter.css';
import BasicInfo from './chapterParts/basicInfo';
import CoverBrowser from './chapterParts/coverBrowser';
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
    this.props.fetchAlbums(this.props.flickrUser);
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
      <Map onClick={(lat, lng) => this.props.fetchAddressDetails(lat, lng, this.props.index)}
        coordinates={this.chapter.locations}/>
    );

    const coverBrowser = (
      <CoverBrowser/>
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
        cover={this.chapter.currentTab === 'basic' ? map : coverBrowser}
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
    fetchAddressDetails,
    changeChapterDates,
    changeChapterSummary,
    switchTabInChapter,
    fetchAlbums
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    newTrip: state.trips.newTrip,
    flickrUser: state.settings.accounts.flickr.user.id
  }
}

Chapter.propTypes = {
  index: propTypes.number,
  newTrip: propTypes.object,
  restrictedDates: propTypes.object,
  fetchAddressDetails: propTypes.func.isRequired,
  changeChapterDates: propTypes.func.isRequired,
  changeChapterSummary: propTypes.func.isRequired,
  switchTabInChapter: propTypes.func.isRequired,
  fetchAlbums: propTypes.func.isRequired,
  flickrUser: propTypes.string.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Chapter);