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
      const newState = [];
      newState[payload] = [];
      return newState;
    }

    default:
      return state
  }

}