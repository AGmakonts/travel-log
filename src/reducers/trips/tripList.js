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
      const chapters: Chapter[] = payload.chapterLocations.map((locationData, index) => {
        const location = new Location(locationData.country, locationData.city, locationData.city, locationData.lng, locationData.lat);
        const startDate = new Date(payload.chapterDates[index].start);
        const endDate = new Date(payload.chapterDates[index].end);
        return new Chapter(startDate, endDate, location, '');
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