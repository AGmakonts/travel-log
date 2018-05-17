import Location from './Location';

export default class Chapter {

  _startDate: Date;
  _endDate: Date;
  _location: Location;
  _summary: String;
  _coverUrl: String;

  /**
   *
   * @param startDate
   * @param endDate
   * @param location
   * @param summary
   * @param coverUrl
   */
  constructor(
    startDate: Date,
    endDate: Date,
    location: Location,
    summary: String,
    coverUrl: String
  ) {
    this._startDate = startDate || new Date();
    this._endDate = endDate || new Date();
    this._location = location || new Location();
    this._summary = summary || '';
    this._coverUrl = coverUrl;
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
  get coverUrl(): String {
    return this._coverUrl;
  }

  /**
   *
   * @param start
   * @param end
   * @return {Chapter}
   */
  withDates(start: Date, end: Date): Chapter {
    return new Chapter(start, end, this.location, this.summary, this.coverUrl);
  }

  /**
   *
   * @param location
   * @return {Chapter}
   */
  withLocation(location: Location): Chapter {
    return new Chapter(this.startDate, this.endDate, location, this.summary, this.coverUrl);
  }

  /**
   *
   * @param summary
   * @return {Chapter}
   */
  withSummary(summary: String): Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, summary, this.coverUrl);
  }

  /**
   *
   * @param coverUrl
   * @return {Chapter}
   */
  withCover(coverUrl: String) : Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, this.summary, coverUrl);
  }
}