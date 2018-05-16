export const RECEIVE_ADDRESS_DETAILS = 'GOOGLE.RECEIVE_ADDRESS_DETAILS';

/**
 *
 * @param country
 * @param area
 * @param formatted
 * @param index
 * @return {{type: string, country: String, area: String, formatted: String, index: number}}
 */
export default function receiveAddressDetails(country: String, area: String, formatted: String, index: number) {

  return {
    type: RECEIVE_ADDRESS_DETAILS,
    country,
    area,
    formatted,
    index
  }

}