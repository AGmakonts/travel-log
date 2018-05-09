export default class Location {

  /**
   *
   * @param country
   * @param area
   * @param city
   * @param longitude
   * @param latitude
   */
  constructor(country: String, area: String, city: String, longitude: number = null, latitude: number = null) {
    this._country = country;
    this._area = area;
    this._city = city;
    this._longitude = longitude;
    this._latitude = latitude;
  }

  _country: String;

  /**
   *
   * @return {String}
   */
  get country(): String {
    return this._country;
  }

  _area: String;

  /**
   *
   * @return {String}
   */
  get area(): String {
    return this._area;
  }

  _city: String;

  /**
   *
   * @return {String}
   */
  get city(): String {
    return this._city;
  }

  _longitude: number;

  /**
   *
   * @return {number}
   */
  get longitude(): number {
    return this._longitude;
  }

  _latitude: number;

  /**
   *
   * @return {number}
   */
  get latitude(): number {
    return this._latitude;
  }
}