import {CHAPTER_LOCATION_CHANGED} from './actionTypes';

function changeChapterLocation(lat: number, lng: number, index: number) {
  return {
    type: CHAPTER_LOCATION_CHANGED,
    payload: {
      lat,
      lng,
      index
    }
  }
}

export default changeChapterLocation;