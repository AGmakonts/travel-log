export const REQUEST_FLICKR_USER_INFO = 'FLICKR.REQUEST_USER_INFO';

export default function requestUserInfo(user_id) {
  return {
    type: REQUEST_FLICKR_USER_INFO,
    user_id
  }
}