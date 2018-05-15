import {FLICKR_USERNAME_FIELD_CHANGED} from '../../../../actions/settings/connectedAccounts/actionTypes';

export default function fieldValue(state = '', action) {

  switch (action.type) {
    case FLICKR_USERNAME_FIELD_CHANGED: {
      return action.payload
    }

    default:
      return state;
  }

}