import {FLICKR_USERNAME_FIELD_CHANGED} from './actionTypes';

export default function changeFlickrUsernameField(value) {
  return {
    type: FLICKR_USERNAME_FIELD_CHANGED,
    payload: value
  }
}