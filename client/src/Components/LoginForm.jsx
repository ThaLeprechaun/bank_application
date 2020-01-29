import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import AuthContext from '../context/auth/authContext';

const LoginForm = props => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error === 'Invalid Credentials') {
      alert('Invalid Credentials');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const { email, password } = userDetails;
  const handleSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please fill in all fields');
    } else {
      login({ email, password });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400, padding: '0 2em' }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Button
          as={Link}
          name="login"
          to="/signup"
          fluid
          size="large"
          color="blue"
          style={{ marginTop: '2em' }}
        >
          Signup
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(LoginForm);
