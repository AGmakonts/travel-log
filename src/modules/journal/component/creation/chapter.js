import {Card, DatePicker, Icon, Input} from 'antd';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import propTypes from 'prop-types';
import React from 'react';
import styles from './chapter.css';

const {TextArea} = Input;
const {RangePicker} = DatePicker;


export default class Chapter extends React.Component {

  componentDidMount() {
    this.props.onDateChange([this.props.dates.start, this.props.dates.end])
  }

  render() {

    const coordinates = this.props.coordinates;
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
          onClick={this.props.onLocationChange}
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
      basic: (<TextArea value={this.props.summary} onChange={(event) => this.props.onSummaryUpdate(event.target.value)} placeholder="Chapter summary" autosize={{minRows: 2}}/>),
      editor: <p>content2</p>
    };

    return (

      <Card
        cover={map}
        actions={[<Icon key={1} type="save"/>]}
        title={
          <div className={styles.title}>
            {coordinates.formatted || 'Add chapter!'}
            <RangePicker defaultValue={[moment(), moment()]} onChange={this.props.onDateChange}/>
          </div>
        }
        tabList={tabList}
        onTabChange={this.props.onTabChange}
        defaultActiveTabKey='basic'
        activeTabKey={this.props.currentTab}
      >
        {contentList[this.props.currentTab]}
      </Card>
    );
  }

}

Chapter.defaultProps = {
  coordinates: {
    lat: null,
    lng: null
  },
  dates: {
    start: moment(),
    end: moment()
  },
  currentTab: 'basic'
};

Chapter.propTypes = {
  coordinates: propTypes.object,
  dates: propTypes.object,
  summary: propTypes.string,
  currentTab: propTypes.string,
  onLocationChange: propTypes.func.isRequired,
  onDateChange: propTypes.func.isRequired,
  onSummaryUpdate: propTypes.func.isRequired,
  onTabChange: propTypes.func.isRequired
};