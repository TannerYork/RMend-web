import { SIGN_IN, SIGN_OUT, GET_USER_INFO } from './types';
import { firebaseApp } from '../../config/FirebaseApp.js';

export const getUserInfo = () => async (dispatch) => {
  const { displayName, email } = firebaseApp.auth().currentUser;
  const idTokenResult = await firebaseApp.auth().currentUser.getIdTokenResult(true);
  const authCode = await idTokenResult.claims.authCode;
  dispatch({ type: GET_USER_INFO, payload: { displayName, email, authCode } });
};

export const userSignedIn = () => async (dispatch) => {
  dispatch({ type: SIGN_IN });
  dispatch(getUserInfo());
};

export const userSignedOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
};
