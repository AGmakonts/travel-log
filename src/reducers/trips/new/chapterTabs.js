import {TAB_CHANGED} from '../../../actions/trip/create/actionTypes';

export default function chapterTabs(state = [], action) {

  const payload = action.payload;
  switch (action.type) {
    case TAB_CHANGED: {
      const newState = [...state];
      newState.splice(payload.index, 1, payload.to);
      return newState;
    }

    default:
      return state;
  }
}