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
    password: '',
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(
    'There was some error while registering, please try again with valid fields'
  );
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
    let message = '';
    Object.keys(userData).map((i) => {
      if (userData[i] === '') {
        console.log(i);
        let field = i;
        field.charAt(0).toUpperCase();
        message += field + ', ';
      }
    });
    if (message !== '') {
      message = message.slice(0, -2);
      message += " can't be empty!";
      setOpen(true);
      setMessage(message);
    } else {
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
        required
        id="standard-required"
        label="Name"
        onChange={handleChange}
        value={userData.fullname}
        name="fullname"
      />
      <TextField
        required
        id="standard-required"
        label="Email"
        onChange={handleChange}
        value={userData.email}
        name="email"
      />
      <TextField
        required
        id="standard-required"
        label="Number"
        onChange={handleChange}
        value={userData.number}
        name="number"
      />
      <TextField
        required
        id="standard-required"
        label="Password"
        type="password"
        onChange={handleChange}
        value={userData.password}
        name="password"
      />
      <br></br>
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
