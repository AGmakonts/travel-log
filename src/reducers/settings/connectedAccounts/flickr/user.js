import {RECEIVE_FLICKR_USER_ID} from '../../../../actions/settings/connectedAccounts/flickr/receiveUserId';
import {RECEIVE_FLICKR_USER_INFO} from '../../../../actions/settings/connectedAccounts/flickr/receiveUserInfo';
import {SETTINGS_RECEIVE} from '../../../../actions/settings/connectedAccounts/receiveAccountSettings';

export default function user(state = null, action) {

  switch (action.type) {

    case RECEIVE_FLICKR_USER_ID: {
      return {
        id: action.id
      };
    }

    case RECEIVE_FLICKR_USER_INFO: {
      return action.userInfo;
    }

    case SETTINGS_RECEIVE: {
      return {
        id: action.settings.flickr
      };
    }

    default:
      return state;
  }

}