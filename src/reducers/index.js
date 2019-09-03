import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import databaseReducer from './databaseReducer';

export default combineReducers({
  auth: authReducer,
  firestore: databaseReducer,
  form: formReducer
});
