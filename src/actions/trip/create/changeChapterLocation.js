import {CHAPTER_LOCATION_CHANGED} from './actionTypes';

function changeChapterLocation(lat: number, lgn: number, index: number) {
  return {
    type: CHAPTER_LOCATION_CHANGED,
    payload: {
      lat,
      lgn,
      index
    }
  }
}

export default changeChapterLocation;