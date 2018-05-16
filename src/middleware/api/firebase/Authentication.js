import firebase from 'firebase';
import {LOGIN} from '../../../actions/authentication/actionTypes';
import Service from '../Service';

export default class Authentication extends Service {


  get trigger() {
    return LOGIN
  }

  handle(action, state) {

    let provider;

    switch (action.payload.provider) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'github':
        provider = new firebase.auth.GithubAuthProvider();
    }

    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;

        resolve({
          data: {
            token,
            user
          }
        })

      }).catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;

        reject({
          data: {
            errorCode,
            errorMessage,
            email,
            credential
          }
        })
      });


    });

  }
}