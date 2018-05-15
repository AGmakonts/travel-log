import {
  CHAPTER_CREATION_STARTED,
  CHAPTER_LOCATION_CHANGED,
  TRIP_CREATION_CANCELED
} from '../../../actions/trip/create/actionTypes';
import {apiAction} from '../../../middleware/api/apiMiddleware';
import ReverseGeocoder from '../../../middleware/api/google/ReverseGeocoder';

export default function chapterLocations(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case CHAPTER_LOCATION_CHANGED: {
      const {lat, lng} = payload;
      const newState = [...state];

      newState.splice(payload.index, 1, {lat, lng});
      return newState;
    }

    case CHAPTER_CREATION_STARTED: {
      const chapterState = [...state];
      if (chapterState[payload]) {
        const previousEntries = chapterState.slice(0, payload);
        const furtherEntries = chapterState.slice(payload);
        const composedNewState = [...previousEntries, {}, ...furtherEntries];
        return composedNewState;
      }
      chapterState[payload] = {};
      return chapterState;
    }

    case apiAction(CHAPTER_LOCATION_CHANGED, ReverseGeocoder).SUCCESS: {

      const index = action.origin.payload.index;
      const originLat = action.origin.payload.lat;
      const originLng = action.origin.payload.lng;
      const country = payload.data.country;
      const city = payload.data.city;
      const formatted = payload.data.formatted;
      const enhancedState = [...state];

      enhancedState.splice(index, 1, {lat: originLat, lng: originLng, country, city, formatted});
      return enhancedState;
    }

    case TRIP_CREATION_CANCELED:
      return [];

    default:
      return state;
  }
}