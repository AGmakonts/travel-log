export const RECEIVE_FLICKR_USER_INFO = 'FLICKR.RECEIVE_USER_INFO';
/**
 *
 * @param userInfo
 * @return {{type: string, userInfo: *}}
 */
export default function receiveUserInfo(userInfo) {
  return {
    type: RECEIVE_FLICKR_USER_INFO,
    userInfo
  }
}
