import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import axios from 'axios';
import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USERS,
  GET_A_USER,
  USER_ERROR,
} from '../types';

const UserState = props => {
  const initialState = {
    users: '',
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  //Get user
  const getUser = async () => {
    try {
      const res = await axios.get('/users');
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  const getAUser = async id => {
    try {
      const res = await axios.get(`/users/${id}`);
      dispatch({ type: GET_A_USER, payload: res.data });
      console.log(res.data);
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  //Add user
  const addUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/users', user, config);
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Update user
  const updateUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`users/${user._id}`, user, config);
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
      console.log(err.response);
    }
  };

  // delete contact
  const deleteUser = async id => {
    try {
      await axios.delete(`user/${id}`);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  console.log(state, 'second');

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        addUser,
        deleteUser,
        updateUser,
        getUser,
        getAUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
