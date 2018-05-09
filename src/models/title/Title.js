export default class Title {

  _title: String;


  constructor(title: String) {
    this._title = title;
  }

  get value(): String {
    return this._title;
  }

  get slug() : String {
    return this.value.replace(/\s|,\s/g,'-');
  }
}