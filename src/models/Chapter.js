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
}