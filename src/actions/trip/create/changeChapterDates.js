import {CHAPTER_DATES_CHANGED} from './actionTypes';

export default function changeChapterDates(start: Date, end: Date, index: number) {
  return {
    type: CHAPTER_DATES_CHANGED,
    payload: {
      start,
      end,
      index
    }
  }
}