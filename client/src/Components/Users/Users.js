import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UserItem from './UserItem';
import UserContext from '../../context/User/userContext';

const Users = () => {
  const userContext = useContext(UserContext);

  const { users, getUser, loading } = userContext;
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  if (users !== null && users.length === 0 && !loading) {
    return <h4>Please add a user</h4>;
  }
  return (
    <>{users !== null && !loading ? <h3>Hello</h3> : <h3>Loading...</h3>}</>
  );
};
export default Users;
