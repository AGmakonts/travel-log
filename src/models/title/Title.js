export default class Title {

  _title: String;


  constructor(title: String) {
    this._title = title;
  }

  get value(): String {
    return this._title;
  }
}