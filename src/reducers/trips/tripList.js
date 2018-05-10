import {LOAD} from 'redux-storage';
import {ADDED} from '../../actions/trip/actionTypes';
import {TRIP_SAVED} from '../../actions/trip/create/actionTypes';
import Chapter from '../../models/Chapter';
import Identifier from '../../models/Identifier';
import Location from '../../models/Location';
import Trip from '../../models/Trip';
import TripFactory from '../../models/TripFactory';

export default function tripList(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case TRIP_SAVED: {
      const chapters: Chapter[] = payload.chapterLocations.map(locationData => {
        return new Chapter(new Date(2017, 1, 1), new Date(2018, 1, 1), new Location(locationData.country, locationData.city, locationData.city, locationData.lng, locationData.lat), '');
      });
      const trip: Trip = new Trip(new Identifier(), chapters, []);

      return [...state, trip];
    }
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