import Flickr from 'flickr-sdk';
import {FLICKR_API_KEY} from '../../../../../config/networkingConfig';
import Photo from '../../../../../models/Photo';
import receivePhotos from './receivePhotos';


export default function fetchPhotos(set_id: String, user_id: String) {

  const flickr = new Flickr(FLICKR_API_KEY);


  const _sortSizes = (sizes) => {
    return sizes.slice().sort((a, b) => {
      return parseInt(a.width) < parseInt(b.width);
    })
  };

  let _constructResponse = function (sizes) {

    return {
      thumbnail: sizes.find(element => {
        return element.label === 'Large Square'
      }).source,
      url: sizes[0].source,
      width: sizes[0].width,
      height: sizes[0].height,
      label: sizes[0].label
    }
  };
  const _constructPhotoObjects = (photos) => {
    return Promise.all(photos.map(photo => {

      return flickr.photos
        .getSizes({
          photo_id: photo.id
        })
        .then(response => {
          return response.body.sizes.size;
        })
        .then(_sortSizes)
        .then(_constructResponse)
        .then(data => {
          return new Photo(data.url, data.thumbnail, data.width, data.height, photo.id, data.label);
        })
    }))
  };

  return dispatch => {

    return flickr.photosets
      .getPhotos({
        user_id: user_id,
        photoset_id: set_id
      })
      .then(response => {
        return response.body.photoset.photo;
      })
      .then(_constructPhotoObjects)
      .then(photos => {
        dispatch(receivePhotos(photos))
      })
  }

}