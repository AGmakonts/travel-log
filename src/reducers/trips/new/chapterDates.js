import moment from 'moment/moment';
import {
  CHAPTER_CREATION_STARTED,
  CHAPTER_DATES_CHANGED,
  TRIP_CREATION_CANCELED
} from '../../../actions/trip/create/actionTypes';

export default function chapterDates(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case CHAPTER_DATES_CHANGED: {
      const {start, end} = payload;
      const newState = [...state];

      newState.splice(payload.index, 1, {start, end});
      return newState;
    }

    case CHAPTER_CREATION_STARTED: {
      const chapterState = [...state];
      if (chapterState[payload]) {
        const previousEntries = chapterState.slice(0, payload);
        const furtherEntries = chapterState.slice(payload);
        const composedNewState = [...previousEntries, {start: moment(), end: moment()}, ...furtherEntries];
        return composedNewState;
      }
      chapterState[payload] = {start: moment(), end: moment()};
      return chapterState;
    }

    case TRIP_CREATION_CANCELED:
      return [];

    default:
      return state;
  }
}