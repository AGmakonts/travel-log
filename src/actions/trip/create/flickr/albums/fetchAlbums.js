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

    dispatch(requestAlbumList());

    const flickr = new Flickr(FLICKR_API_KEY);

    return flickr.people
      .getPhotos({
        user_id: user_id
      })
      .then(response => {
        return response.body.photo
      })
      .then(body => {
        dispatch(receiveAlbumList(body))
      });

  }
}