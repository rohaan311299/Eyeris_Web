import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import './Register.css';
import { AuthContext } from '../auth/AuthContext';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = (props) => {
  const [userData, setUserData] = useState({
    fullname: '',
    number: '',
    email: '',
    role: '',
    password: '',
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const { currentUser, setCurrentUser } = useContext(AuthContext);

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
        if (result.success) {
          localStorage.setItem('eyerisToken', result.token);
          setCurrentUser(result);
        }
      })
      .catch((error) => console.log('error', error));
  }

  // Snackbar
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
