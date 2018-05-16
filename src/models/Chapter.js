import Location from './Location';

export default class Chapter {

  _startDate: Date;
  _endDate: Date;
  _location: Location;
  _summary: String;

  constructor(startDate: Date, endDate: Date, location: Location, summary: String) {
    this._startDate = startDate;
    this._endDate = endDate;
    this._location = location;
    this._summary = summary;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get location(): Location {
    return this._location;
  }

  get summary(): String {
    return this._summary;
  }

  /**
   *
   * @param start
   * @param end
   * @return {Chapter}
   */
  withDates(start: Date, end: Date) : Chapter {
    return new Chapter(start, end, this.location, this.summary);
  }

  /**
   *
   * @param location
   * @return {Chapter}
   */
  withLocation(location: Location) : Chapter {
    return new Chapter(this.startDate, this.endDate, location, this.summary);
  }

  /**
   *
   * @param summary
   * @return {Chapter}
   */
  withSummary(summary: String) : Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, summary);
  }
}