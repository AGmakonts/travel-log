import {RECEIVE_PHOTOS} from '../../../../actions/trip/create/flickr/photos/receivePhotos';

export default function currentSetPhotos(state = [], action) {

  switch (action.type) {
    case RECEIVE_PHOTOS: {
      return action.photos;
    }
    default:
      return state;
  }

}