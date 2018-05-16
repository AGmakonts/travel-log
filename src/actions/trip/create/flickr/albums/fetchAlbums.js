import Flickr from 'flickr-sdk';
import {FLICKR_API_KEY} from '../../../../../config/networkingConfig';
import receiveAlbumList from './receiveAlbumList';
import requestAlbumList from './requestAlbumList';

/**
 *
 * @param user_id
 * @return {function(*): *}
 */
export default function fetchAlbums(user_id: String) {

  return dispatch => {

    if (user_id === null) {
      return;
    }

    dispatch(requestAlbumList());

    const flickr = new Flickr(FLICKR_API_KEY);

    return flickr.photosets
      .getList({
        user_id: user_id
      })
      .then(response => {
        return response.body.photosets.photoset
      })
      .then(photosets => {
        return photosets.map(photoset => {
          return {
            id: photoset.id,
            secret: photoset.secret,
            title: photoset.title._content,
            description: photoset.description._content,
            cover: `https://farm${photoset.farm}.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}_q.jpg`
          }
        })
      })
      .then(body => {
        dispatch(receiveAlbumList(body))
      });

  }
}