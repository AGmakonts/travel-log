import {LOAD} from 'redux-storage';
import {FLICKR_USERNAME_ENTERED} from '../../../../actions/settings/connectedAccounts/actionTypes';
import {apiAction} from '../../../../middleware/api/apiMiddleware';
import SettingsReader from '../../../../middleware/api/firebase/SettingsReader';
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

    case apiAction(LOAD, SettingsReader).SUCCESS: {
      return {
        id: action.payload.accounts.flickr
      };
    }

    case apiAction(apiAction(LOAD, SettingsReader).SUCCESS, UserInfoRetrieval).SUCCESS: {
      return action.payload;
    }

    default:
      return state;
  }

}