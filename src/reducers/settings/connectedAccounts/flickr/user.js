import {FLICKR_USERNAME_ENTERED} from '../../../../actions/settings/connectedAccounts/actionTypes';
import {apiAction} from '../../../../middleware/api/apiMiddleware';

export default function user(state = null, action) {

  switch (action.type) {

    case FLICKR_USERNAME_ENTERED: {
      return state;
    }

    case apiAction(FLICKR_USERNAME_ENTERED).SUCCESS: {
      return action.payload
    }

    default:
      return state;
  }

}