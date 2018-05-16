import {DISMISS_PHOTO_BROWSER} from '../../../actions/trip/create/dismissPhotoBrowser';
import {SELECT_ALBUM} from '../../../actions/trip/create/flickr/albums/setActiveAlbum';
import {OPEN_PHOTO_BROWSER} from '../../../actions/trip/create/openPhotoBrowser';

const initialState = {
  visible: false,
  forChapter: null,
  targetSection : null,
  selectedSet: null
};

export default function photoBrowser(state = initialState, action) {

  switch (action.type) {

    case SELECT_ALBUM: {
      return {
        ...state,
        selectedSet: action.id
      }
    }

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