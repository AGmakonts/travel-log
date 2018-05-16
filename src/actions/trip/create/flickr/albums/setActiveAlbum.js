export const SELECT_ALBUM = 'FLICKR.SELECT_ALBUM';

export default function setActiveAlbum(id: String) {
  return {
    type: SELECT_ALBUM,
    id
  }
}