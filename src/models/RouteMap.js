import Route from './Route';

export default class RouteMap {

  constructor(route: Route, from: number, to: number) {
    this._route = route;
    this._from = from;
    this._to = to;
  }

  _route: Route;

  get route(): Route {
    return this._route;
  }

  _from: number;

  get from(): number {
    return this._from;
  }

  _to: number;

  get to(): number {
    return this._to;
  }
}