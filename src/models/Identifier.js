import uuidGenerator from 'uuid/v4';

export default class Identifier {

  _uuid: String;

  constructor(uuid: String | null = null) {
    if (!uuid) {
      uuid = uuidGenerator();
    }

    this._uuid = uuid;
  }

  get uuid(): String {
    return this._uuid;
  }
}