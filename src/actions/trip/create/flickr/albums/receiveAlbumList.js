export const RECEIVE_ALBUM_LIST = 'FLICKR.RECEIVE_ALBUM_LIST';
export default function receiveAlbumList(data) {
  return {
    type: RECEIVE_ALBUM_LIST,
    data: data
  }
}