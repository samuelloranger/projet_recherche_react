import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const API_KEY = process.env.APP_RECETTES_FIREBASE_API_KEY;

const firebaseApp = firebase.initializeApp({
	apiKey: API_KEY,
	authDomain: 'app-recettes-6fed6.firebaseapp.com',
	databaseURL: 'https://app-recettes-6fed6.firebaseio.com'
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
