import Location from './Location';

export default class Route {

  /**
   *
   * @param origin
   * @param destination
   * @param midpoints
   * @param distance
   * @param duration
   */
  constructor(origin: Location, destination: Location, midpoints: Location[], distance: number, duration: number) {
    this._origin = origin;
    this._destination = destination;
    this._midpoints = midpoints;
    this._distance = distance;
    this._duration = duration;
  }

  _origin: Location;

  get origin(): Location {
    return this._origin;
  }

  _destination: Location;

  get destination(): Location {
    return this._destination;
  }

  _midpoints: Location[];

  get midpoints(): Location[] {
    return this._midpoints;
  }

  _distance: number;

  get distance(): number {
    return this._distance;
  }

  _duration: number;

  get duration(): number {
    return this._duration;
  }
}