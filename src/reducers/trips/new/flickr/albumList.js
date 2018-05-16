import {RECEIVE_ALBUM_LIST} from '../../../../actions/trip/create/flickr/albums/receiveAlbumList';

export default function albumList(state = [], action) {

  switch (action.type) {

    case RECEIVE_ALBUM_LIST: {
      return action.data;
    }

    default:
      return state;
  }

}