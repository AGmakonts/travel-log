import fetchPhotos from '../photos/fetchPhotos';
import setActiveAlbum from './setActiveAlbum';

export default function selectAlbum(id: String, user_id: String) {

  return dispatch => {

    dispatch(setActiveAlbum(id));
    dispatch(fetchPhotos(id, user_id));

  }

}