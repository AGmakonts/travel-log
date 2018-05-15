import {APPLY} from '../../../actions/settings/actionTypes';
import Service from '../Service';

export default class SettingsWriter extends Service {

  get trigger() {
    return APPLY;
  }

  handle(action) {
    return new Promise();
  }
}