import {LOAD} from 'redux-storage';
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

    case LOAD: {
      return action.payload.currentUser;
    }

    default:
      return state;
  }
}