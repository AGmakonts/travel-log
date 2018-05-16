import {Card, Modal} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchAlbums from '../../../../../actions/trip/create/flickr/albums/fetchAlbums';
import styles from './photoBrowser.css';

class PhotoBrowser extends React.Component {

  componentDidMount() {
    this.props.fetchAlbums(this.props.flickrUser);
  }

  renderCards() {
    return this.props.albumList.map(album => {

      return (
        <div className={styles.card} key={album.id}>
          <Card cover={<img src={album.cover}/>}>
            <Card.Meta title={album.title} description={album.description}/>
          </Card>
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
        visible={this.props.visible}
        onCancel={this.props.onCancel}
      >
        <div className={styles.container}>
          {this.renderCards()}
        </div>
      </Modal>


    );
  }

}

PhotoBrowser.defaultProps = {
  albumList: []
};

PhotoBrowser.propTypes = {
  albumList: propTypes.array,
  fetchAlbums: propTypes.func.isRequired,
  flickrUser: propTypes.string.isRequired,
  visible: propTypes.bool,
  onCancel: propTypes.func,
  chapter: propTypes.number

};

function mapStateToProps(state) {
  return {
    albumList: state.trips.newTrip.flickr.albumList,
    flickrUser: state.settings.accounts.flickr.user.id,
    chapter: state.trips.newTrip.photoBrowser.forChapter,
    visible: state.trips.newTrip.photoBrowser.visible

  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchAlbums
  };

  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBrowser);