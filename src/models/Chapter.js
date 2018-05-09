import Location from './Location';

export default class Chapter {

  constructor(startDate: Date, endDate: Date, location: Location) {
    this._startDate = startDate;
    this._endDate = endDate;
    this._location = location;
  }

  _startDate: Date;

  get startDate(): Date {
    return this._startDate;
  }

  _endDate: Date;

  get endDate(): Date {
    return this._endDate;
  }

  _location: Location;

  get location(): Location {
    return this._location;
  }
}