import Chapter from '../Chapter';
import RouteMap from '../RouteMap';
import ChapterBuilder from './ChapterBuilder';
import RouteBuilder from './RouteBuilder';

export default class TripBuilder {

  _title: String;
  _chapters: Chapter[];
  _routes: RouteMap[];

  /**
   *
   * @param title
   * @return {TripBuilder}
   */
  setTitle(title: String): TripBuilder {
    this._title = title;
    return this;
  }

  /**
   *
   * @return {ChapterBuilder}
   */
  addRoute(): RouteBuilder {
    return new RouteBuilder(this);
  }

}