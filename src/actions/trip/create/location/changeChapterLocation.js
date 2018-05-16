import {CHAPTER_LOCATION_CHANGED} from '../actionTypes';

/**
 *
 * @param lat
 * @param lng
 * @param index
 * @return {{type: string, payload: {lat: number, lng: number, index: number}}}
 */
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