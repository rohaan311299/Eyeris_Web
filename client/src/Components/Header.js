import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(currentUser);
  }, []);
  function logoutHandler() {
    setCurrentUser(null);
    localStorage.removeItem('eyerisToken');
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Eyeris</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" class="justify-content-end">
            <Nav className="ml-auto justify-content-end">
              {!currentUser ? (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link onClick={logoutHandler}>
                  <i className="fas fa-user"></i> Logout
                </Nav.Link>
              )}

              {!currentUser ? null : (
                <LinkContainer to="/profile">
                  <Nav.Link onClick={logoutHandler}>
                    <i className="fas fa-user-circle"></i> Profile
                  </Nav.Link>
                </LinkContainer>
              )}

              {!currentUser ? (
                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="fas fa-user-plus"></i> Sign Up
                  </Nav.Link>
                </LinkContainer>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
