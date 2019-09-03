import { SIGN_IN, SIGN_OUT, GET_USER } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
  tokens: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        tokens: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        tokens: null
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
