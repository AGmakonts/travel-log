import {LOGIN} from '../../actions/authentication/actionTypes';
import {apiAction} from '../../middleware/api/apiMiddleware';

export default function currentUser(state = null, action) {

  switch (action.type) {
    case LOGIN: {
      return state;
    }

    case apiAction(LOGIN).SUCCESS: {
      return action.payload.data.user || state
    }

    default:
      return state;
  }
}