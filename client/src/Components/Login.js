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

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      props.history.push('/');
    }
  }, [currentUser]);

  function handleChange(event) {
    const val = event.target.value;
    setUserData({
      ...userData,
      [event.target.name]: val,
    });
    // console.log(userData);
  }

  function loginHandler() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: userData.email,
      password: userData.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:5000/api/v1/user/login', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result);
        if (result) {
          localStorage.setItem('eyerisToken', result.token);
          setCurrentUser(result.sendUser);
          console.log(result.sendUser);
        }
      })
      .catch((error) => console.log('error', error));
  }

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
