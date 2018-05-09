import Title from './Title';

export default class StaticTitle extends Title {

  constructor(value: String) {
    super();
    this._title = value;
  }
}