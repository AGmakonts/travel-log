import moment from 'moment';
import Chapter from './Chapter';
import Identifier from './Identifier';
import RouteMap from './RouteMap';
import DynamicTitle from './title/DynamicTitle';
import StaticTitle from './title/StaticTitle';
import Title from './title/Title';

export default class Trip {

  _identifier: Identifier;
  _routes: RouteMap[] = [];
  _chapters: Chapter[] = [];
  _title: StaticTitle | null;

  /**
   *
   * @param chapter
   * @return {*[]}
   * @private
   */
  _extractDates = (chapter: Chapter): String[] => {
    return [
      moment(chapter.startDate).format('MMMM'),
      moment(chapter.endDate).format('MMMM')
    ];
  };

  /**
   *
   * @param chapter
   * @return {string}
   * @private
   */
  _extractCountryName = (chapter: Chapter): String => {
    return chapter.location.country;
  };

  constructor(identifier: Identifier, chapters: Chapter[], routes: RouteMap[], title: StaticTitle | null = null) {
    this._identifier = identifier;
    this._chapters = chapters;
    this._routes = routes;
    this._title = title;
  }

  /**
   *
   * @return {Identifier}
   */
  get identifier(): Identifier {
    return this._identifier;
  }

  /**
   *
   * @return {Chapter[]}
   */
  get chapters(): Chapter[] {
    return this._chapters;
  }

  /**
   *
   * @return {*}
   */
  get title(): Title {

    if (this._title) {
      return this._title;
    }

    const locations: String[] = this.chapters.map(this._extractCountryName);
    const datePairs = this.chapters.map(this._extractDates);
    const months = datePairs.flatMap(element => {
      return element
    });

    return new DynamicTitle(locations, months);
  }

  /**
   *
   * @return {Date}
   */
  get date(): Date {
    const chapterCopy = this.chapters.slice();
    const sortedChapters = chapterCopy.sort((a: Chapter, b: Chapter) => {
      return b.startDate - a.startDate;
    });
    const firstChapter = sortedChapters[0];

    return firstChapter.startDate;
  }

  /**
   *
   * @return {Date}
   */
  get endDate(): Date {
    const chapterCopy = this.chapters.slice();
    const sortedChapters = chapterCopy.sort((a: Chapter, b: Chapter) => {
      return b.startDate - a.startDate;
    });
    const lastChapter = sortedChapters.pop();

    return lastChapter.endDate;
  }

  /**
   *
   * @return {number}
   */
  get chapterCount(): number {
    return this.chapters.length;
  }
}