export default class Location {

  _country: String;
  _area: String;
  _city: String;
  _longitude: number;
  _latitude: number;

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

  /**
   *
   * @return {String}
   */
  get country(): String {
    return this._country;
  }

  /**
   *
   * @return {String}
   */
  get area(): String {
    return this._area;
  }

  /**
   *
   * @return {String}
   */
  get city(): String {
    return this._city;
  }

  /**
   *
   * @return {number}
   */
  get longitude(): number {
    return this._longitude;
  }

  /**
   *
   * @return {number}
   */
  get latitude(): number {
    return this._latitude;
  }

  get lat(): number {
    return this.latitude;
  }

  get lng() : number {
    return this.longitude;
  }
}