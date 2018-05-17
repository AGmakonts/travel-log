export const SELECT_PHOTO_FOR_CHAPTER = 'SELECT_PHOTO_FOR_CHAPTER';
export default function selectPhotoForChapter(url) {
  return {
    type: SELECT_PHOTO_FOR_CHAPTER,
    url
  }
}