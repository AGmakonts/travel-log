import Location from './Location';
import Photo from './Photo';

export default class Chapter {

  _startDate: Date;
  _endDate: Date;
  _location: Location;
  _summary: String;
  _photo: Photo;

  /**
   *
   * @param startDate
   * @param endDate
   * @param location
   * @param summary
   * @param photo
   */
  constructor(
    startDate: Date,
    endDate: Date,
    location: Location,
    summary: String,
    photo: Photo
  ) {
    this._startDate = startDate || new Date();
    this._endDate = endDate || new Date();
    this._location = location || new Location();
    this._summary = summary || '';
    this._photo = photo || new Photo();
  }

  /**
   *
   * @return {Date}
   */
  get startDate(): Date {
    return this._startDate;
  }

  /**
   *
   * @return {Date}
   */
  get endDate(): Date {
    return this._endDate;
  }

  /**
   *
   * @return {Location}
   */
  get location(): Location {
    return this._location;
  }

  /**
   *
   * @return {String}
   */
  get summary(): String {
    return this._summary;
  }

  /**
   *
   * @return {String}
   */
  get photo(): Photo {
    return this._photo;
  }

  /**
   *
   * @param start
   * @param end
   * @return {Chapter}
   */
  withDates(start: Date, end: Date): Chapter {
    return new Chapter(start, end, this.location, this.summary, this.photo);
  }

  /**
   *
   * @param location
   * @return {Chapter}
   */
  withLocation(location: Location): Chapter {
    return new Chapter(this.startDate, this.endDate, location, this.summary, this.photo);
  }

  /**
   *
   * @param summary
   * @return {Chapter}
   */
  withSummary(summary: String): Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, summary, this.photo);
  }

  /**
   *
   * @param photo
   * @return {Chapter}
   */
  withPhoto(photo: Photo) : Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, this.summary, photo);
  }
}