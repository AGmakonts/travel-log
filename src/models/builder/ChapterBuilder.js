import Location from '../Location';
import TripBuilder from './TripBuilder';

export default class ChapterBuilder {

  _startDate: Date;
  _endDate: Date;
  _location: Location;
  _tripBuilder: TripBuilder;

  constructor(tripBuilder: TripBuilder) {
    this._tripBuilder = tripBuilder;
  }


}