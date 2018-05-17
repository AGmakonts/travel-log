import {Card, Modal} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchAlbums from '../../../../../actions/trip/create/flickr/albums/fetchAlbums';
import selectAlbum from '../../../../../actions/trip/create/flickr/albums/selectAlbum';
import selectPhotoForChapter from '../../../../../actions/trip/create/selectPhotoForChapter';
import styles from './photoBrowser.css';

class PhotoBrowser extends React.Component {

  componentDidMount() {
    this.props.fetchAlbums(this.props.flickrUser);
  }

  renderCards() {
    return this.props.albumList.map(album => {

      return (
        <div className={styles.card} key={album.id}>
          <Card cover={<img src={album.cover}/>}
            onClick={() => this.props.selectAlbum(album.id, this.props.flickrUser)}>
            <Card.Meta title={album.title} description={album.description}/>
          </Card>
        </div>
      );

    });
  }

  renderPhotos() {
    return this.props.photos.map(photo => {

      return (
        <div className={styles.photo} key={photo.url}
          onClick={() => this.props.selectPhotoForChapter(this.props.chapter, this.props.target, photo.url)}>
          <img src={photo.thumbnail}/>
        </div>
      );

    });
  }

  render() {
    return (
      <Modal
        width={'80%'}
        bodyStyle={{height: '500px', overflow: 'scroll'}}
        title={`Select photo for chapter ${this.props.chapter}`}
        visible
        onCancel={this.props.onCancel}
      >
        <div className={styles.container}>
          {!this.props.selectedSet ? this.renderCards() : this.renderPhotos()}
        </div>
      </Modal>


    );
  }

}

PhotoBrowser.defaultProps = {
  albumList: [],
  photos: []
};

PhotoBrowser.propTypes = {
  albumList: propTypes.array,
  photos: propTypes.array,
  fetchAlbums: propTypes.func.isRequired,
  selectAlbum: propTypes.func.isRequired,
  flickrUser: propTypes.string.isRequired,
  onCancel: propTypes.func,
  chapter: propTypes.number,
  selectedSet: propTypes.number,
  target: propTypes.any,
  selectPhotoForChapter: propTypes.func
};

function mapStateToProps(state) {
  return {
    albumList: state.trips.newTrip.flickr.albumList,
    selectedSet: state.trips.newTrip.photoBrowser.selectedSet,
    photos: state.trips.newTrip.flickr.currentSetPhotos,
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchAlbums,
    selectAlbum,
    selectPhotoForChapter
  };

  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowser);