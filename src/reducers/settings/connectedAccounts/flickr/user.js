import {LOAD} from 'redux-storage';
import {FLICKR_USERNAME_ENTERED} from '../../../../actions/settings/connectedAccounts/actionTypes';
import {apiAction} from '../../../../middleware/api/apiMiddleware';

export default function user(state = null, action) {

  switch (action.type) {

    case FLICKR_USERNAME_ENTERED: {
      return state;
    }

    case apiAction(FLICKR_USERNAME_ENTERED).SUCCESS: {
      return {
        id: action.payload
      }
    }

    case apiAction(apiAction(FLICKR_USERNAME_ENTERED).SUCCESS).SUCCESS: {
      return action.payload;
    }

    case apiAction(apiAction(LOAD).SUCCESS).SUCCESS: {
      return action.payload;
    }

    case apiAction(LOAD).SUCCESS: {
      return {
        id: action.payload.accounts.flickr
      };
    }

    default:
      return state;
  }

}