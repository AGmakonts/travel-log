import Chapter from './Chapter';
import Identifier from './Identifier';
import Location from './Location';
import Trip from './Trip';

export default class TripFactory {

  static create(data): Trip {

    const {
      _identifier,
      _routes,
      _chapters,
      _title
    } = data;


    const chapters = _chapters.map(TripFactory._createChapter);
    return new Trip(new Identifier(_identifier._uuid), chapters, _routes, _title);

  }

  static _createChapter(data): Chapter {

    const {
      _startDate,
      _endDate,
      _location,
      _summary
    } = data;

    const {
      _country,
      _area,
      _city,
      _longitude,
      _latitude
    } = _location;

    const startDate = new Date(_startDate);
    const endDate = new Date(_endDate);
    const location = new Location(_country, _area, _city, _longitude, _latitude);
    return new Chapter(startDate, endDate, location, _summary);
  }
}