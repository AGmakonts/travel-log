import {
  CHAPTER_CREATION_STARTED,
  CHAPTER_LOCATION_CHANGED,
  TRIP_CREATION_CANCELED
} from '../../../actions/trip/create/actionTypes';
import {RECEIVE_ADDRESS_DETAILS} from '../../../actions/trip/create/location/receiveAddressDetails';
import {REQUEST_ADDRESS_DETAILS} from '../../../actions/trip/create/location/requestAddressDetails';

export default function chapterLocations(state = [], action) {

  const payload = action.payload;
  const enhancedState = [...state];


  switch (action.type) {
    case CHAPTER_LOCATION_CHANGED: {
      const {lat, lng} = payload;

      enhancedState.splice(payload.index, 1, {...state[payload.index],lat, lng});
      return enhancedState;
    }

    case CHAPTER_CREATION_STARTED: {
      if (enhancedState[payload]) {
        const previousEntries = enhancedState.slice(0, payload);
        const furtherEntries = enhancedState.slice(payload);
        return [...previousEntries, {loaded: true}, ...furtherEntries];
      }
      enhancedState[payload] = {loaded: true};
      return enhancedState;
    }

    case REQUEST_ADDRESS_DETAILS: {

      const stateElement = {
        ...state[action.index],
        loaded: false
      };

      enhancedState.splice(action.index, 1, stateElement);
      return enhancedState;
    }

    case RECEIVE_ADDRESS_DETAILS: {

      const stateElement = {
        ...state[action.index],
        loaded: true,
        country: action.country,
        city: action.area,
        formatted: action.formatted
      };

      enhancedState.splice(action.index, 1, stateElement);
      return enhancedState;
    }

    case TRIP_CREATION_CANCELED:
      return [];

    default:
      return state;
  }
}