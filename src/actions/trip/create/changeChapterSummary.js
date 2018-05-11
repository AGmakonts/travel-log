import {CHAPTER_SUMMARY_CHANGED} from './actionTypes';

export default function changeChapterSummary(summary: String, index: number) {

  return {
    type: CHAPTER_SUMMARY_CHANGED,
    payload: {
      summary,
      index
    }
  }

}