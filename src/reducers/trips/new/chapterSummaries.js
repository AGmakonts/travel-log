import {CHAPTER_CREATION_STARTED, CHAPTER_SUMMARY_CHANGED} from '../../../actions/trip/create/actionTypes';

export default function chapterSummaries(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case CHAPTER_SUMMARY_CHANGED: {
      const newState = [...state];
      newState.splice(payload.index, 1, payload.summary);
      return newState;
    }

    case CHAPTER_CREATION_STARTED: {
      const chapterState = [...state];

      if (chapterState[payload]) {
        const previousEntries = chapterState.slice(0, payload);
        const furtherEntries = chapterState.slice(payload);
        const composedNewState = [...previousEntries, '', ...furtherEntries];
        return composedNewState;
      }

      chapterState[payload] = '';
      return chapterState;
    }

    default:
      return state
  }

}