import {CHAPTER_LOCATION_CHANGED} from '../../../actions/trip/create/actionTypes';
import Service from '../Service';

export default class ReverseGeocoder extends Service {

  _client;


  constructor(client) {
    super();
    this._client = client;
  }

  get trigger(): String {
    return CHAPTER_LOCATION_CHANGED;
  }

  handle(action): Promise {
    return new Promise((resolve, reject) => this._makeCall(action, resolve, reject));
  }

  /**
   *
   * @param action
   * @param resolve
   * @param reject
   * @private
   */
  _makeCall = (action, resolve, reject) => {
    const {lat, lng} = action.payload;
    const request = {
      'latlng': {lat, lng},
      'result_type': 'country|locality'
    };

    this._client.reverseGeocode(request, (result, status) => {
      const results = status.json.results[0].address_components;
      const locationData = {
        country: null,
        city: null
      };

      results
        .filter(element => {
          return this._isCity(element) || this._isCountry(element)
        })
        .forEach(element => {
          if (this._isCity(element)) {
            locationData.city = element.long_name;
          } else {
            locationData.country = element.long_name;
          }
        });

      resolve({data: locationData});

    });
  };

  _isCountry(element) {
    return element.types.indexOf('country') !== -1;
  }

  _isCity(element) {
    return element.types.indexOf('locality') !== -1;
  }
}