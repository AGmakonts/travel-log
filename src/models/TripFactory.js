import Trip from './Trip';
import Chapter from './Chapter';
import Location from './Location';
import Identifier from './Identifier';

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
      _location
    } = data;

    const {
      _country,
      _area,
      _city,
      _longitude,
      _latitude
    } = _location;

    return new Chapter(new Date(_startDate), new Date(_endDate), new Location(_country, _area, _city, _longitude, _latitude));
  }
}