export const RECEIVE_FLICKR_USER_ID = 'FLICKR.RECEIVE_USER_ID';

/**
 *
 * @param id
 * @return {{type: string, id: *}}
 */
export default function receiveUserId(id) {
  return {
    type: RECEIVE_FLICKR_USER_ID,
    id
  }
}
