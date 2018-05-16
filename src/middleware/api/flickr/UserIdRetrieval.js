import Flickr from 'flickr-sdk';
import {FLICKR_USERNAME_ENTERED} from '../../../actions/settings/connectedAccounts/actionTypes';
import Service from '../Service';

export default class UserIdRetrieval extends Service {

  _flickr: Flickr;


  constructor(key: String) {
    super();
    this._flickr = new Flickr(key);

  }

  get trigger(): String {
    return FLICKR_USERNAME_ENTERED
  }

  handle(action, state): Promise {

    return this._flickr.people
      .findByUsername({
        username: action.payload
      })
      .then(this._extractId);

  }

  _extractId = (result) => {
    return result.body.user.nsid;
  }
}