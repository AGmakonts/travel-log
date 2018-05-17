export default class Photo {

  _url: String;
  _thumbnail: String;
  _width: number;
  _height: number;
  _flickrId: String;
  _sizeName: String

  /**
   *
   * @param url
   * @param thumbnail
   * @param width
   * @param height
   * @param flickrId
   * @param sizeName
   */
  constructor(url: String, thumbnail: String, width: number, height: number, flickrId: string, sizeName: String) {
    this._url = url;
    this._thumbnail = thumbnail;
    this._width = width;
    this._height = height;
    this._flickrId = flickrId;
    this._sizeName = sizeName;
  }


  get url(): String {
    return this._url;
  }

  get thumbnail(): String {
    return this._thumbnail;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get flickrId(): string {
    return this._flickrId;
  }


  get sizeName(): String {
    return this._sizeName;
  }
}