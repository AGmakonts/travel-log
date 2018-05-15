import {FLICKR_USERNAME_ENTERED} from './actionTypes';

export default function confirmFlickrUsername(username: String) {
  return {
    type: FLICKR_USERNAME_ENTERED,
    payload: username
  }
}