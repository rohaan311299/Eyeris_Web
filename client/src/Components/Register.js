import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import './Register.css';
import { AuthContext } from '../auth/AuthContext';

const Register = (props) => {
  const [userData, setUserData] = useState({
    fullname: '',
    number: '',
    email: '',
    role: '',
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

  function registerHandler() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log(userData);
    var raw = JSON.stringify({
      name: userData.fullname,
      mobile: userData.number,
      email: userData.email,
      role: 'user',
      password: userData.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    console.log(raw, requestOptions);
    fetch('http://localhost:5000/api/v1/user/register', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem('eyerisToken', result.token);
      })
      .catch((error) => console.log('error', error));
  }
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Name"
        onChange={handleChange}
        value={userData.fullname}
        name="fullname"
      />
      <TextField
        id="standard-basic"
        label="Email"
        onChange={handleChange}
        value={userData.email}
        name="email"
      />
      <TextField
        id="standard-basic"
        label="Number"
        onChange={handleChange}
        value={userData.number}
        name="number"
      />
      <TextField
        id="standard-basic"
        label="Password"
        type="password"
        onChange={handleChange}
        value={userData.password}
        name="password"
      />
      <button onClick={registerHandler}>Register</button>
    </div>
  );
};

export default Register;
