import {TOGGLE} from '../../actions/settings/actionTypes';

export default function visible(state = false, action) {
  switch (action.type) {
    case TOGGLE: {
      return !state;
    }

    default:
      return state;
  }
}

