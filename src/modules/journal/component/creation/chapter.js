import {Card, DatePicker, Icon, Input} from 'antd';
import GoogleMapReact from 'google-map-react';
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

const {TextArea} = Input;
const {RangePicker} = DatePicker;


class Chapter extends React.Component {

  get chapter() {
    return {
      dates: this.props.newTrip.chapterDates[this.props.index],
      locations: this.props.newTrip.chapterLocations[this.props.index],
      summary: this.props.newTrip.chapterSummaries[this.props.index],
      currentTab: this.props.newTrip.chapterTabs[this.props.index],
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
    const marker = <Icon className={styles.marker} type="environment" lat={coordinates.lat} lng={coordinates.lng}
      style={{fontSize: 30}}/>;

    const map = (
      <div className={styles.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyCekIreelGUg_VydHTlm6mJnv6YV6Y70I8'}}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33
          }}
          defaultZoom={0}
          onClick={event => this.props.changeChapterLocation(event.lat, event.lng, this.props.index)}
        >
          {coordinates.lat && coordinates.lng && marker}
        </GoogleMapReact>
      </div>
    );

    const tabList = [{
      key: 'basic',
      tab: 'Basic info'
    }, {
      key: 'editor',
      tab: 'Chapter editor'
    }];

    const contentList = {
      basic: (<TextArea value={this.chapter.summary}
        onChange={(event) => this.props.changeChapterSummary(event.target.value, this.props.index)}
        placeholder="Chapter summary" autosize={{minRows: 2}}/>),
      editor: <p>content2</p>
    };

    return (

      <Card
        cover={map}
        actions={[<Icon key={1} type="save"/>]}
        title={
          <div className={styles.title}>
            {coordinates.formatted || 'Add chapter!'}
            <RangePicker disabledDate={this.disabledDate} defaultValue={[moment(), moment()]}
              onChange={event => this.props.changeChapterDates(event[0], event[1], this.props.index)}/>
          </div>
        }
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

Chapter.defaultProps = {
  currentTab: 'basic'
};

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