import {createClient} from '@google/maps/lib/index';
import {GOOGLE_API_KEY} from '../../../../config/networkingConfig';
import changeChapterLocation from './changeChapterLocation';
import receiveAddressDetails from './receiveAddressDetails';
import requestAddressDetails from './requestAddressDetails';

/**
 *
 * @param lat
 * @param lng
 * @param index
 * @return {Function}
 */
export default function fetchAddressDetails(lat: number, lng: number, index: number): Function {

  return dispatch => {

    dispatch(changeChapterLocation(lat, lng, index));
    dispatch(requestAddressDetails(index));

    const client = createClient({key: GOOGLE_API_KEY});
    const request = {
      'latlng': {lat, lng},
      'result_type': 'country|locality|administrative_area_level_1|administrative_area_level_2|administrative_area_level_3|administrative_area_level_4'
    };

    client.reverseGeocode(request, (result, status) => {
      const results = status.json.results[0].address_components;
      let country = null;
      let area = null;
      const formatted = status.json.results[0].formatted_address;

      results
        .filter(element => {
          return element.types.indexOf('locality') !== -1 || element.types.indexOf('country') !== -1
        })
        .forEach(element => {
          if (element.types.indexOf('locality') !== -1) {
            area = element.long_name;
          } else {
            country = element.long_name;
          }
        });

      dispatch(receiveAddressDetails(country, area, formatted, index));

    });

  }
}