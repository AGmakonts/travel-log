import {CHAPTER_CREATION_STARTED, TRIP_CREATION_CANCELED} from '../../../actions/trip/create/actionTypes';
import {UPDATE_CHAPTER} from '../../../actions/trip/create/updateChapter';
import Chapter from '../../../models/Chapter';

export default function chapters(state = [], action) {

  const newState = [...state];
  switch (action.type) {

    case UPDATE_CHAPTER: {
      newState.splice(action.atIndex, 1, action.chapter);
      return newState;
    }

    case TRIP_CREATION_CANCELED: {
      return []
    }

    case CHAPTER_CREATION_STARTED: {

      const index = action.payload;

      if (newState[index]) {
        const previousEntries = newState.slice(0, index);
        const furtherEntries = newState.slice(index);
        return [...previousEntries, new Chapter(), ...furtherEntries];
      }

      newState[index] = new Chapter();
      return newState;
    }

    default:
      return state;
  }

}