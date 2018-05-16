export const REQUEST_FLICKR_USER_ID = 'FLICKR.REQUEST_USER_ID';

export default function requestUserId(username) {
  return {
    type: RECEIVE_FLICKR_USER_ID,
    username
  }
}
