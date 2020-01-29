import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
// import { useToast, immediateToast } from 'izitoast-react';
import instance from '../request';
// import AlertContext from '../context/alert/alertContext';

const Register = () => {
  // const alertContext = useContext(AlertContext);

  // const { setAlert } = alertContext;

  // const showMessage = useToast({
  //   message: 'Registered Successfully',
  // });
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bvn: '',
    email: '',
    password: '',
    transactionPin: '',
  });

  const {
    firstName,
    lastName,
    phone,
    bvn,
    email,
    password,
    transactionPin,
  } = userDetails;
  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    if (
      firstName === '' ||
      lastName === '' ||
      phone === '' ||
      bvn === '' ||
      email === '' ||
      password === '' ||
      transactionPin === ''
    ) {
      alert('Please Enter All fields');
    }
    e.preventDefault();
    instance.post('/users', userDetails);
    console.log(userDetails);
    //   userDetails = {
    //   firstName: '',
    //   lastName: '',
    //   phone: '',
    //   bvn: '',
    //   email: '',
    //   password: '',
    //   transactionPin: ''
    // };
  };

  return (
    <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400, padding: '0 2em' }}>
        <Header as="h2" color="teal" textAlign="center">
          Register with us
        </Header>
        <Form size="tiny" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="FirstName"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="LastName"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="BVN"
              name="bvn"
              value={userDetails.bvn}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email"
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Transaction Pin"
              type="password"
              name="transactionPin"
              value={userDetails.transactionPin}
              onChange={handleChange}
            />

            <Button type="submit" color="blue" fluid size="large">
              Signup
            </Button>
          </Segment>
        </Form>
        <Button
          as={Link}
          name="login"
          to="/login"
          fluid
          size="large"
          color="teal"
          style={{ marginTop: '2em' }}
        >
          Log In
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
