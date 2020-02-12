import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const API_KEY = process.env.REACT_APP_MOVIES_FIREBASE_API_KEY;

const firebaseApp = firebase.initializeApp({
	apiKey: API_KEY,
	authDomain: 'movies-watch-list-fca27.firebaseapp.com',
	databaseURL: 'https://movies-watch-list-fca27.firebaseio.com'
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
