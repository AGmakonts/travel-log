import {CHAPTER_CREATION_STARTED} from './actionTypes';

export default function start(index: number) {
  return {
    type: CHAPTER_CREATION_STARTED,
    payload: index
  }
}