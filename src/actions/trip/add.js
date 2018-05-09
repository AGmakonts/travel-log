import Trip from '../../models/Trip';
import {ADDED} from './actionTypes';

function addTrip(trip: Trip) {
  return {
    type: ADDED,
    payload: trip
  }
}

export default addTrip;