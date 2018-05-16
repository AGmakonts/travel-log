import Flickr from 'flickr-sdk';
import {FLICKR_API_KEY} from '../../../../config/networkingConfig';
import receiveUserInfo from './receiveUserInfo';

const _formatResult = (person) => {
  const iconserverInt = parseInt(person.iconserver);
  const iconfarm = parseInt(person.iconfarm);
  return {
    avatarUrl: iconserverInt > 0 ? `http://farm${iconfarm}.staticflickr.com/${iconserverInt}/buddyicons/${person.id}.jpg` : 'https://www.flickr.com/images/buddyicon.gif',
    id: person.id,
    name: person.username._content,
    description: person.description._content
  }
};

const _extractPerson = (personResponse) => {
  return personResponse.body.person;
};


export default function fetchUserInfo(user_id: String): Function {

  return dispatch => {

    const flickr = new Flickr(FLICKR_API_KEY);
    return flickr.people.getInfo({user_id})
      .then(_extractPerson)
      .then(_formatResult)
      .then(userInfo => dispatch(receiveUserInfo(userInfo)));
  }
}