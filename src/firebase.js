import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseApp = firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: "chatbox-react-app-7cc52.firebaseapp.com",
    databaseURL: "https://chatbox-react-app-7cc52.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;