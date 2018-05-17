import {DISMISS_PHOTO_BROWSER} from '../../../actions/trip/create/dismissPhotoBrowser';
import {SELECT_ALBUM} from '../../../actions/trip/create/flickr/albums/setActiveAlbum';
import {OPEN_PHOTO_BROWSER} from '../../../actions/trip/create/openPhotoBrowser';
import {SELECT_PHOTO_FOR_CHAPTER} from '../../../actions/trip/create/selectPhotoForChapter';

const initialState = {
  visible: false,
  forChapter: null,
  targetSection : null,
  selectedSet: null,
  selectedPhoto: null
};

export default function photoBrowser(state = initialState, action) {

  switch (action.type) {

    case SELECT_ALBUM: {
      return {
        ...state,
        selectedSet: action.id
      }
    }

    case SELECT_PHOTO_FOR_CHAPTER: {
      return {
        ...state,
        selectedPhoto: action.url
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