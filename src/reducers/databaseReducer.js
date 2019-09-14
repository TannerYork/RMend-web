import { FETCH_USERS, FETCH_PENDING_USERS } from '../actions/types';

const INITIAL_STATE = {
  users: [],
  pendingUsers: [],
  reports: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };

    case FETCH_PENDING_USERS:
      return { ...state, pendingUsers: action.payload };

    default:
      return state;
  }
};
