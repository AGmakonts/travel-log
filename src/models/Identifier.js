import uuidGenerator from 'uuid/v4';

export default class Identifier {

  constructor(uuid: String | null = null) {
    if (!uuid) {
      uuid = uuidGenerator();
    }

    this._uuid = uuid;
  }

  _uuid: String;

  get uuid(): String {
    return this._uuid;
  }
}