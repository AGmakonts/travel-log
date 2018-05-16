import {Icon} from 'antd';
import GoogleMapReact from 'google-map-react';
import propTypes from 'prop-types';
import React from 'react';
import styles from '../chapter.css';

export default class Map extends React.Component {

  render() {

    const coordinates = this.props.coordinates;

    return (
      <div className={styles.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyCekIreelGUg_VydHTlm6mJnv6YV6Y70I8'}}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33
          }}
          defaultZoom={0}
          onClick={event => this.props.onClick(event.lat, event.lng)}
        >
          {coordinates && coordinates.lat && coordinates.lng && <Icon className={styles.marker} type="environment" lat={coordinates.lat} lng={coordinates.lng} style={{fontSize: 30}}/>}
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  coordinates: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired
};