import {CHAPTER_LOCATION_CHANGED} from '../../../actions/trip/create/actionTypes';
import {apiAction} from '../../../middleware/api/apiMiddleware';

export default function chapterLocations(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case CHAPTER_LOCATION_CHANGED: {
      const {lat, lng} = payload;
      const newState = [...state];

      newState.splice(payload.index, 1, {lat, lng});
      return newState;
    }

    case apiAction(CHAPTER_LOCATION_CHANGED).SUCCESS: {

      const index = action.origin.payload.index;
      const originLat = action.origin.payload.lat;
      const originLng = action.origin.payload.lng;
      const country = payload.data.country;
      const city = payload.data.city;
      const enhancedState = [...state];

      enhancedState.splice(index, 1, {lat: originLat, lng: originLng, country, city});
      return enhancedState;
    }

    default:
      return state;
  }
}