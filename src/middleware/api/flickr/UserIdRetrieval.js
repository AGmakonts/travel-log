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

  handle(action): Promise {

    return this._flickr.people
      .findByUsername({
        username: action.payload
      })
      .then(this._extractId);
    // .then(this._getInfo)
    // .then(this._extractPerson)
    // .then(this._formatResult);
  }

  _formatResult = (person) => {
    const iconserverInt = parseInt(person.iconserver);
    const iconfarm = parseInt(person.iconfarm);
    return {
      avatarUrl: iconserverInt > 0 ? `http://farm${iconfarm}.staticflickr.com/${iconserverInt}/buddyicons/${person.id}.jpg` : 'https://www.flickr.com/images/buddyicon.gif',
      id: person.id,
      name: person.username._content,
      description: person.description._content
    }
  }

  _extractPerson = (personResponse) => {
    return personResponse.body.person;
  }

  _getInfo = (id) => {
    return this._flickr.people.getInfo({
      user_id: id
    })
  }

  _extractId = (result) => {
    return result.body.user.nsid;
  }
}