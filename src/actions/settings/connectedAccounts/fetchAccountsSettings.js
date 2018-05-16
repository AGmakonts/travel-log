import firebase from 'firebase/index';
import receiveAccountSettings from './receiveAccountSettings';

export default function fetchAccountsSettings(user_id: String) {

  return dispatch => {

    const settings = {timestampsInSnapshots: true};
    firebase.firestore().settings(settings);

    const settingsRef = firebase.firestore().collection('settings');

    const userSettings = settingsRef.doc(user_id);

    return userSettings.get().then((doc) => {
      if (!doc.exists) {
        throw new Error('no settings present');
      }
      dispatch(receiveAccountSettings(doc.data().accounts));
    });
  }
}