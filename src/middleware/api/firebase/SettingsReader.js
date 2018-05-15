import firebase from 'firebase/index';
import {LOAD} from 'redux-storage';
import Service from '../Service';

export default class SettingsReader extends Service {

  get trigger() {
    return LOAD;
  }

  handle(action) {
    const settings = {timestampsInSnapshots: true};
    firebase.firestore().settings(settings);

    const settingsRef = firebase.firestore().collection('settings');
    const userSettings = settingsRef.doc(action.payload.currentUser.uid);

    return userSettings.get().then((doc) => {
      if (!doc.exists) {
        throw new Error('no settings present');
      }
      return doc.data();
    });
  }
}