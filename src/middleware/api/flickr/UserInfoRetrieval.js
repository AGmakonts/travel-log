import Flickr from 'flickr-sdk';
import {LOAD} from 'redux-storage';
import {FLICKR_USERNAME_ENTERED} from '../../../actions/settings/connectedAccounts/actionTypes';
import {apiAction} from '../apiMiddleware';
import SettingsReader from '../firebase/SettingsReader';
import Service from '../Service';
import UserIdRetrieval from './UserIdRetrieval';

export default class UserInfoRetrieval extends Service {

  _flickr: Flickr;


  constructor(key: String) {
    super();
    this._flickr = new Flickr(key);

  }

  get trigger(): String {
    return [
      apiAction(FLICKR_USERNAME_ENTERED, UserIdRetrieval).SUCCESS,
      apiAction(LOAD, SettingsReader).SUCCESS
    ];
  }

  handle(action): Promise {

    return this._flickr.people.getInfo({
      user_id: action.payload.accounts ? action.payload.accounts.flickr : action.payload
    })
      .then(this._extractPerson)
      .then(this._formatResult);
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
  };

  _extractPerson = (personResponse) => {
    return personResponse.body.person;
  };
}