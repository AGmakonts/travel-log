import {Card, DatePicker, Divider, Icon, Input, Tabs} from 'antd';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import propTypes from 'prop-types';
import React, {Fragment} from 'react';
import styles from './map.css';

const {Meta} = Card;
const {TextArea} = Input;
const {RangePicker} = DatePicker;
const TabPane = Tabs.TabPane;


export default class Chapter extends React.Component {

  componentDidMount() {
    this.props.onDateChange([this.props.dates.start, this.props.dates.end])
  }

  render() {

    const coordinates = this.props.coordinates;
    const marker = <Icon className={styles.marker} type="environment" lat={coordinates.lat} lng={coordinates.lng} style={{fontSize: 30}}/>;
    const map = <div className={styles.mapContainer}>
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
    </div>;

    const tabList = [{
      key: 'tab1',
      tab: 'Basic info',
    }, {
      key: 'tab2',
      tab: 'Chapter editor',
    }];

    const contentList = {
      tab1: <Fragment>
        <RangePicker size='large' defaultValue={[moment(), moment()]} onChange={this.props.onDateChange}/>
        <Divider/>
        <TextArea placeholder="Chapter summary" autosize={{minRows: 2}}/>
      </Fragment>,
      tab2: <p>content2</p>,
    };

    return (

      <Card
        cover={map}
        actions={[<Icon key={1} type="save"/>]}
        title='Add chapter!'
        tabList={tabList}
      >
        <Meta
          title={coordinates.formatted || 'Pick location of this chapter'}
          description={
            <Fragment>
              <RangePicker size='large' defaultValue={[moment(), moment()]} onChange={this.props.onDateChange}/>
              <Divider/>
              <TextArea placeholder="Chapter summary" autosize={{minRows: 2}}/>
            </Fragment>
          }
        />
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
  }
};

Chapter.propTypes = {
  coordinates: propTypes.object,
  dates: propTypes.object,
  onLocationChange: propTypes.func.isRequired,
  onDateChange: propTypes.func.isRequired
};