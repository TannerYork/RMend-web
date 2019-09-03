import { FETCH_USERS, FETCH_PENDING_USERS, FETCH_REPORTS } from '../actions/types';

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

    case FETCH_REPORTS:
      return { ...state, reports: action.payload };

    default:
      return state;
  }
};
