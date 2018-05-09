import {LOAD} from 'redux-storage';
import {SELECTED} from '../../actions/trip/actionTypes';

export default function selected(state = null, action) {

  const payload = action.payload;
  switch (action.type) {
    case SELECTED:
      return payload;
    case LOAD:
      return payload.trips ? payload.trips.selected : state;
    default:
      return state;
  }
}