import {TAB_CHANGED} from './actionTypes';

export default function switchTabInChapter(to: String, index: number) {
  return {
    type: TAB_CHANGED,
    payload: {
      to,
      index
    }
  }
}