export const REQUEST_ADDRESS_DETAILS = 'GOOGLE.REQUEST_ADDRESS_DETAILS';

/**
 *
 * @param index
 * @return {{type: string, index: *}}
 */
export default function requestAddressDetails(index) {
  return {
    type: REQUEST_ADDRESS_DETAILS,
    index
  }
}