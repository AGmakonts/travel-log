import Location from './Location';

export default class Chapter {

  _startDate: Date;
  _endDate: Date;
  _location: Location;

  constructor(startDate: Date, endDate: Date, location: Location) {
    this._startDate = startDate;
    this._endDate = endDate;
    this._location = location;
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
}