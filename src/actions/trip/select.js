import Trip from '../../models/Trip';
import {SELECTED} from './actionTypes';

function selectTrip(trip: Trip) {
  return {
    type: SELECTED,
    payload: trip
  }
}

export default selectTrip;