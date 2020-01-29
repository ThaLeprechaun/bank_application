import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USERS,
  GET_A_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_A_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user,
        ),
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user,
        ),
        loading: false,
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
