import {TRIP_SAVED} from './actionTypes';

export default function save(newTripData) {
  return {
    type: TRIP_SAVED,
    payload: newTripData
  }
}