import {CHAPTER_CREATION_STARTED, TAB_CHANGED, TRIP_CREATION_CANCELED} from '../../../actions/trip/create/actionTypes';

export default function chapterTabs(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case TAB_CHANGED: {
      const newState = [...state];
      newState.splice(payload.index, 1, payload.to);
      return newState;
    }

    case TRIP_CREATION_CANCELED: {
      return [];
    }

    case CHAPTER_CREATION_STARTED: {
      const chapterState = [...state];

      if (chapterState[payload]) {
        const previousEntries = chapterState.slice(0, payload);
        const furtherEntries = chapterState.slice(payload);
        return [...previousEntries, 'basic', ...furtherEntries];
      }

      chapterState[payload] = 'basic';
      return chapterState;
    }

    default:
      return state;
  }
}