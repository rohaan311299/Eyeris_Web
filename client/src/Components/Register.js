import React from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";

const Register = () => {
    return (
        <div>
            <Form className="py-3">
                <Row>
                    <Col sm={12} md={6}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="number" placeholder="Contact Number" />
                        </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-3">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Register
