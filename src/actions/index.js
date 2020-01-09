import { auth, firestore, functions, storage} from '../config/firebase';
import firebase from 'firebase';
import {
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
  FETCH_USERS,
  FETCH_PENDING_USERS,
  FETCH_REPORTS
} from './types';

export const createUserWithEmailPasswordAndUserName = (
  email,
  password,
  userName
) => async dispatch => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      await user.user.updateProfile({ displayName: userName });
      await firestore
        .collection('users')
        .doc(user.user.uid)
        .update({ displayName: userName });
    })
    .catch(error => {
      alert(error.message);
    });
};

export const signInWithEmailAndPassword = (email, password) => async dispatch => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => async dispatch => {
  await auth.signOut();
};

export const sendPasswordRestEmail = email => async dispatch => {
  await auth.sendPasswordResetEmail(email);
};

export const updatePassword = password => async dispatch => {
  auth.currentUser.updatePassword(password);
};

export const getUserInfo = () => async dispatch => {
  const user = await firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .get();
  dispatch({
    type: GET_USER,
    payload: user.data()
  });
};

export const listenForAuthChange = history => async dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('User Signed In');
      user.getIdTokenResult(true).then(userIdTokenResult => {
        dispatch({ type: SIGN_IN, payload: userIdTokenResult.claims });
        dispatch(getUserInfo());
        if (userIdTokenResult.claims.verified !== true) history.push('/unverified');
        if (userIdTokenResult.claims.verified === true) history.push('/reports');
      });
    } else {
      console.log('User Signed Out');
      dispatch({ type: SIGN_OUT });
      history.push('/');
    }
  });
};

export const fetchUsers = users =>  {
  return{ type: FETCH_USERS, payload: users };
};

export const fetchPendingUsers = users => {
  return { type: FETCH_PENDING_USERS, payload: users };
};

export const fetchReports = reports => {
  return { type: FETCH_REPORTS, payload: reports };
};

export const updateUserInfo = (userId, verification, magisterialDistrict) => async dispatch => {
  const updateUserInfo = await functions.httpsCallable('updateUserInfo');
  const results = await updateUserInfo({ userId, verification, magisterialDistrict });
  if (results.error) console.log(results.error.message);
  if (results.result) console.log(results.result);
};

export const createReport = formValues => async dispatch => {
  const date = new Date();
  const timestamp = date.toDateString();
  const data = {
    sender: auth.currentUser.displayName,
    roadName: formValues.roadName,
    timestamp: timestamp,
    details: formValues.details,
    magisterialDistrict: formValues.magisterialDistrict,
    nearestStreet: formValues.nearestStreet,
    priority: formValues.nearestStreet,
    isBeingReviewed: false
  };

  try {
    const messageRef = await firestore.collection('reports').add(data);
    const photos = formValues.photos
    for (var i = 0; i < photos.length; i++) {
      // Upload images to Cloud Storage
      const filePath = `reports/${messageRef.id}/${messageRef.id}-initial-${i}`;
      const fileSnapshot = await storage.ref(filePath).put(photos[i]);
      
      // Generate a public URL for the file
      const url = await fileSnapshot.ref.getDownloadURL();
      // Update the chat message placeholder with the real image
      messageRef.update({
        id: messageRef.id, 
        photos: firebase.firestore.FieldValue.arrayUnion({
          id: messageRef.id, 
          imageUrl: url, 
          imageUri: fileSnapshot.metadata.fullPath
        })
      });
    }
  } catch(error) {
    alert(error)
  }
};

export const deleteReport = reportID => async dispatch => {
  await firestore.collection('reports').doc(reportID).delete();
}

export const updatePriority = (reportID, priority) => async dispatch => {
  await firestore.collection('reports').doc(reportID).update({ priority: priority });
}

export const putReportUnderReview = reportID => async dispatch => {
  await firestore.collection('reports').doc(reportID).update({ isBeingReviewed: true });
}