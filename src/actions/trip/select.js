import {SELECTED} from './actionTypes';

function selectTrip(tripId: String) {
  return {
    type: SELECTED,
    payload: tripId
  }
}

export default selectTrip;