import Flickr from 'flickr-sdk';
import {FLICKR_API_KEY} from '../../../../../config/networkingConfig';
import receivePhotos from './receivePhotos';

export default function fetchPhotos(set_id: String, user_id: String) {

  return dispatch => {
    const flickr = new Flickr(FLICKR_API_KEY);

    return flickr.photosets
      .getPhotos({
        user_id: user_id,
        photoset_id: set_id
      })
      .then(response => {
        return response.body.photoset.photo;
      })
      .then(photos => {
        return photos.map(photo => {
          return {
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_h.jpg`,
            thumbnail: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`
          }
        })
      })
      .then(photos => {
        dispatch(receivePhotos(photos))
      })
  }

}