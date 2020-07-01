import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import { FIREBASE_CONFIG, FIREBASE_DEV_CONFIG } from './keys';

if (!FIREBASE_CONFIG) {
  console.error('Firebase config still needs to be created in a keys.js file.');
}

const fire = firebase.initializeApp(FIREBASE_DEV_CONFIG);
export default firebase;
export const auth = fire.auth();
export const firestore = fire.firestore();
export const storage = fire.storage();
export const functions = fire.functions();

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const GoogleAuthId = new firebase.auth.GoogleAuthProvider().providerId;
