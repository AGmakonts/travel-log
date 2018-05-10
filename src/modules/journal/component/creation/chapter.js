import {Card, Icon} from 'antd';
import GoogleMapReact from 'google-map-react';
import propTypes from 'prop-types';
import React from 'react';
import styles from './map.css';

const {Meta} = Card;


export default class Chapter extends React.Component {



  render() {


    const marker = <Icon classNames={styles.marker} type="environment" lat={this.props.coords.lat} lng={this.props.coords.lng} style={{fontSize: 30}}/>;
    const map = <div
      style={{height: '300px', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyCekIreelGUg_VydHTlm6mJnv6YV6Y70I8'}}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={0}
        onClick={this.props.onLocationChange}
      >
        {this.props.coords.lat && this.props.coords.lng && marker}
      </GoogleMapReact>
    </div>;

    return (
      <Card
        cover={map}
        actions={[<Icon key={1} type="save"/>]}
        title='Create new chapter!'
      >
        <Meta
          title="Card title"
          description="This is the description"
        />
      </Card>
    );
  }

}

Chapter.defaultProps = {
  coords : {
    lat: null,
    lng: null
  }
};

Chapter.propTypes = {
  coords: propTypes.object,
  onLocationChange: propTypes.func.isRequired
};