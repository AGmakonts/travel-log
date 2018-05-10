import {Card, Icon, Input} from 'antd';
import GoogleMapReact from 'google-map-react';
import propTypes from 'prop-types';
import React from 'react';
import styles from './map.css';

const {Meta} = Card;
const {TextArea} = Input;


export default class Chapter extends React.Component {

  render() {


    const marker = <Icon className={styles.marker} type="environment" lat={this.props.coordinates.lat} lng={this.props.coordinates.lng} style={{fontSize: 30}}/>;
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
        {this.props.coordinates.lat && this.props.coordinates.lng && marker}
      </GoogleMapReact>
    </div>;

    return (
      <Card
        cover={map}
        actions={[<Icon key={1} type="save"/>]}
        title='Add chapter!'
      >
        <Meta
          title={this.props.coordinates.formatted || 'Pick location of this chapter'}
          description={
            <TextArea placeholder="Chapter summary" autosize={{minRows: 2}}/>
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
  }
};

Chapter.propTypes = {
  coordinates: propTypes.object,
  onLocationChange: propTypes.func.isRequired
};