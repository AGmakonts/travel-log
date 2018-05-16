import {FLICKR_USERNAME_ENTERED} from '../../../../actions/settings/connectedAccounts/actionTypes';
import {SETTINGS_RECEIVE} from '../../../../actions/settings/connectedAccounts/receiveAccountSettings';
import {apiAction} from '../../../../middleware/api/apiMiddleware';
import UserIdRetrieval from '../../../../middleware/api/flickr/UserIdRetrieval';
import UserInfoRetrieval from '../../../../middleware/api/flickr/UserInfoRetrieval';

export default function user(state = null, action) {

  switch (action.type) {

    case FLICKR_USERNAME_ENTERED: {
      return state;
    }

    case apiAction(FLICKR_USERNAME_ENTERED, UserIdRetrieval).SUCCESS: {
      return {
        id: action.payload
      }
    }

    case apiAction(apiAction(FLICKR_USERNAME_ENTERED, UserIdRetrieval).SUCCESS, UserInfoRetrieval).SUCCESS: {
      return action.payload;
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