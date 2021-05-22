import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('eyerisToken');
    console.log(token);
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + token);
      myHeaders.append('Cookie', 'token=' + token);

      var raw = '';

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      console.log(myHeaders);
      fetch('http://localhost:5000/api/v1/user/me', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          if (result._id !== undefined || result._id !== null) {
            console.log('Redirect to home page (logged in)');
            // setIsLoggedIn(true);
            setCurrentUser(result);
          }
          console.log(`No user`, token);
        })
        .catch((error) => console.log('error', error));
    } else {
      setCurrentUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
