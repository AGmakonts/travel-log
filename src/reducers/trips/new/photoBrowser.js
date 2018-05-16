import {DISMISS_PHOTO_BROWSER} from '../../../actions/trip/create/dismissPhotoBrowser';
import {OPEN_PHOTO_BROWSER} from '../../../actions/trip/create/openPhotoBrowser';

const initialState = {
  visible: false,
  forChapter: null,
  targetSection : null
};

export default function photoBrowser(state = initialState, action) {

  switch (action.type) {
    case DISMISS_PHOTO_BROWSER: {
      return initialState;
    }
    case OPEN_PHOTO_BROWSER: {
      return {
        ...state,
        visible: true,
        forChapter: action.forChapter,
        targetSection: action.intent
      };
    }

    default:
      return state;
  }

}