import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAGYj9JqbtXCzdEjTlwBaJossbmMKLau-4",
  authDomain: "travel-log-203619.firebaseapp.com",
  databaseURL: "https://travel-log-203619.firebaseio.com",
  projectId: "travel-log-203619",
  storageBucket: "travel-log-203619.appspot.com",
  messagingSenderId: "803917890476"
};

export default firebase.initializeApp(config);