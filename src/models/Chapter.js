import {EditorState} from 'draft-js';
import Location from './Location';
import Photo from './Photo';

export default class Chapter {

  _startDate: Date;
  _endDate: Date;
  _location: Location;
  _summary: String;
  _photo: Photo;
  _content;

  /**
   *
   * @param startDate
   * @param endDate
   * @param location
   * @param summary
   * @param photo
   * @param content
   */
  constructor(
    startDate: Date,
    endDate: Date,
    location: Location,
    summary: String,
    photo: Photo,
    content: any
  ) {
    this._startDate = startDate || new Date();
    this._endDate = endDate || new Date();
    this._location = location || new Location();
    this._summary = summary || '';
    this._photo = photo || new Photo();
    this._content = content;
  }

  /**
   *
   * @return {Date}
   */
  get startDate(): Date {
    return this._startDate;
  }

  /**
   *
   * @return {Date}
   */
  get endDate(): Date {
    return this._endDate;
  }

  /**
   *
   * @return {Location}
   */
  get location(): Location {
    return this._location;
  }

  /**
   *
   * @return {String}
   */
  get summary(): String {
    return this._summary;
  }

  /**
   *
   * @return {String}
   */
  get photo(): Photo {
    return this._photo;
  }

  get content(): any {
    return this._content;
  }

  /**
   *
   * @param start
   * @param end
   * @return {Chapter}
   */
  withDates(start: Date, end: Date): Chapter {
    return new Chapter(start, end, this.location, this.summary, this.photo, this.content);
  }

  /**
   *
   * @param location
   * @return {Chapter}
   */
  withLocation(location: Location): Chapter {
    return new Chapter(this.startDate, this.endDate, location, this.summary, this.photo, this.content);
  }

  /**
   *
   * @param summary
   * @return {Chapter}
   */
  withSummary(summary: String): Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, summary, this.photo, this.content);
  }

  /**
   *
   * @param photo
   * @return {Chapter}
   */
  withPhoto(photo: Photo) : Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, this.summary, photo, this.content);
  }

  /**
   *
   * @param content
   * @return {Chapter}
   */
  withContent(content): Chapter {
    return new Chapter(this.startDate, this.endDate, this.location, this.summary, this.photo, content);

  }
}