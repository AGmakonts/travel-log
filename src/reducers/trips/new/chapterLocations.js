import {CHAPTER_LOCATION_CHANGED} from '../../../actions/trip/create/actionTypes';

export default function chapterLocations(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case CHAPTER_LOCATION_CHANGED: {
      const {lat, lgn} = payload;
      const newState = [...state];
      newState.splice(payload.index, 1,{lat, lgn});
      return newState;
    }
    default:
      return state;
  }
}