import Flickr from 'flickr-sdk';
import {FLICKR_API_KEY} from '../../../../config/networkingConfig';
import fetchUserInfo from './fetchUserInfo';
import receiveUserId from './receiveUserId';

const _extractId = (result) => {
  return result.body.user.nsid;
};

export default function fetchUser(username) {

  return dispatch => {
    const flickr = new Flickr(FLICKR_API_KEY);

    return flickr.people
      .findByUsername({username})
      .then(_extractId)
      .then(id => {
        dispatch(receiveUserId(id));
        dispatch(fetchUserInfo(id));
      });
  }
}