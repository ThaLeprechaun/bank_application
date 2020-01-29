import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

import UserState from './context/User/UserState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './Components/routing/PrivateRoute';
import Dashboard from './pages/dashboard';
import setAuthToken from './utils/setAuthToken';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center h-100">
          <p>Loading...</p>
        </div>
      }
    >
      <Router>
        <AuthState>
          <AlertState>
            <UserState>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </UserState>
          </AlertState>
        </AuthState>
      </Router>
    </Suspense>
  );
}

export default App;
