import React, { useContext, useEffect } from 'react';
import Users from '../Components/Users/Users';
import AuthContext from '../context/auth/authContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <Users />
    </div>
  );
};

export default Dashboard;
