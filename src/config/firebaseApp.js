import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/functions';
import * as geofirex from 'geofirex';
import { FIREBASE_DEV_CONFIG } from './keys';

export const firebaseApp = firebase.initializeApp(FIREBASE_DEV_CONFIG);
export const geo = geofirex.init(firebase);

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    return { result: 'Successfully Signed User In' };
  } catch (err) {
    return { error: err.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseApp.auth().signOut();
    return { result: 'Successfully Signed Out' };
  } catch (err) {
    return { error: err.message };
  }
};

export const updateAuthCode = async (newAuthCode) => {
  try {
    const updateUserAuthCode = await firebaseApp.functions().httpsCallable('updateUserAuthCode');
    const results = await updateUserAuthCode({ authCode: newAuthCode });
    return results;
  } catch (err) {
    return { error: err.message };
  }
};

export const makeAdminFrom = async (userId) => {
  try {
    const makeUserAdmin = await firebaseApp.functions().httpsCallable('makeUserAdmin');
    const results = await makeUserAdmin({ userId });
    return results;
  } catch (err) {
    return { error: err.message };
  }
};

export const getAuthority = async (authCode) => {
  try {
    var querySnapshot = await firebaseApp
      .firestore()
      .collection('authorities')
      .where('authCode', '==', authCode)
      .get();

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push(doc.data());
    });

    if (reports.length == 0 || reports.length > 1) {
      throw Error("Couldn't find authority from the given authority code.");
    } else {
      return { result: reports[0] };
    }
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

export const getAdminsAuthorityReports = () => {
  const authCode = firebaseApp.auth().currentUser;
};
