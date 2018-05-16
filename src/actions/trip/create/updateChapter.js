import Chapter from '../../../models/Chapter';

export const UPDATE_CHAPTER = 'UPDATE_CHAPTER';
export default function updateChapter(chapter: Chapter, atIndex: number) {

  return {
    type: UPDATE_CHAPTER,
    chapter,
    atIndex
  }

}