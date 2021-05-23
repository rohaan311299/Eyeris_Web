import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(
    'There was some error, Please try again and check your credentials!'
  );
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
        result = JSON.parse(result);
        console.log(result, result.success);
        if (result.success) {
          localStorage.setItem('eyerisToken', result.token);
          setCurrentUser(result.sendUser);
          console.log(result.sendUser);
        } else {
          if (result.error) {
            setMessage(result.error);
          }
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log('error', error.error);
        setMessage(error.error);
        setOpen(true);
      });
  }

  // SnackBar

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
      <button onClick={loginHandler}>Login</button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
