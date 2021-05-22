import React, { useEffect, useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../auth/AuthContext';

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      props.history.push('/');
    }
  }, []);

  function handleChange(event) {
    const val = event.target.value;
    setUserData({
      ...userData,
      [event.target.name]: val,
    });
    // console.log(userData);
  }

  function loginHandler() {}

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Email"
        onChange={handleChange}
        value={userData.email}
        name="email"
      />
      <TextField
        id="standard-basic"
        label="Password"
        type="password"
        onChange={handleChange}
        value={userData.password}
        name="password"
      />
      <button onClick={loginHandler}>Register</button>
    </div>
  );
};

export default Login;
