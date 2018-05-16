export const RECEIVE_PHOTOS = 'FLICKR.RECEIVE_PHOTOS';
export default function receivePhotos(photos) {

  return {
    type: RECEIVE_PHOTOS,
    photos
  }

}