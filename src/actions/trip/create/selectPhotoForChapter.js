export const SELECT_PHOTO_FOR_CHAPTER = 'SELECT_PHOTO_FOR_CHAPTER';
export default function selectPhotoForChapter(chapter, intent, url) {
  return {
    type: SELECT_PHOTO_FOR_CHAPTER,
    chapter,
    intent,
    url
  }
}