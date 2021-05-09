import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Eyeris</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/profile">
                                <Nav.Link><i className="fas fa-user-circle"></i> Profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link><i className="fas fa-user-plus"></i> Register</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
