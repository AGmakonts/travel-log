import {Card, Icon} from 'antd';
import GoogleMapReact from 'google-map-react';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeChapterLocation from '../../../../actions/trip/create/changeChapterLocation';

const {Meta} = Card;

class Creator extends React.Component {

  createMapOptions = (maps) => {
    return {

    };
  };

  handleMapClick = (event) => {
    const {lat, lng} = event;

    this.props.changeChapterLocation(lat, lng, 0);

  };


  render() {

    const map = <div style={{height: '300px', width: '100%'}}>
      <GoogleMapReact
        options={this.createMapOptions}
        bootstrapURLKeys={{key: 'AIzaSyCekIreelGUg_VydHTlm6mJnv6YV6Y70I8'}}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={0}
        onClick={this.handleMapClick}
      >
        <Icon type="environment" lat={this.props.chapterLocations[0] ? this.props.chapterLocations[0].lat :  59} lng={this.props.chapterLocations[0] ? this.props.chapterLocations[0].lgn :  30} style={{fontSize: 30}}/>
      </GoogleMapReact>
    </div>;

    return (
      <div>
        <h2>Create new trip!</h2>
        {this.props.chapterLocations[0] ? this.props.chapterLocations[0].lat: 0}
        {this.props.chapterLocations[0] ? this.props.chapterLocations[0].lgn : 0}
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
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeChapterLocation
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    chapterLocations: state.trips.newTrip.chapterLocations,
  }
}

Creator.propTypes = {
  changeChapterLocation: propTypes.func,
  chapterLocations: propTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);