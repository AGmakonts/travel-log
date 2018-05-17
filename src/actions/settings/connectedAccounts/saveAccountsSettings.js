import firebase from 'firebase/index';

export default function saveAccountsSettings(accountsSettings: Object, userId: String) {

  return dispatch => {
    const settings = {timestampsInSnapshots: true};
    firebase.firestore().settings(settings);

    const settingsRef = firebase.firestore().collection('settings');

    const userSettings = settingsRef.doc(userId);

    userSettings
      .update({
        accounts: {
          flickr: accountsSettings.accounts.flickr.user.id
        }
      });
  }
}