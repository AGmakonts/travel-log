import TripBuilder from './TripBuilder';

export default class RouteBuilder {

  _tripBuilder: TripBuilder;


  constructor(tripBuilder: TripBuilder) {
    this._tripBuilder = tripBuilder;
  }
}