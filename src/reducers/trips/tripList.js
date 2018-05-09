import {LOAD} from 'redux-storage';
import TripFactory from '../../models/TripFactory';
import {ADDED} from '../../actions/trip/actionTypes';

export default function tripList(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case ADDED:
      return [...state, payload];
    case LOAD:
      return payload.trips ? [...payload.trips.tripList.map(data => {
        return TripFactory.create(data);
      })] : state;
    default:
      return state;
  }
}