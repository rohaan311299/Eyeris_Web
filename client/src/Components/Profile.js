import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (currentUser) {
      setOrders(currentUser.cart);
      console.log(currentUser.cart);
    }
  });
  return (
    <div>
      <LinkContainer to="/">
        <Button variant="dark" className="mt-3">Back to Products</Button>
      </LinkContainer>
      <div className="container">
        <Row className="mt-3">
          <Col sm={12} md={4}>
            <img
              style={{ height: '50%', width: 'auto' }}
              src="https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
            />
          </Col>
          <Col sm={12} md={8}>
            <Card>
              <Card.Body>
                <Card.Title><strong>Name: </strong>{currentUser.name}</Card.Title>
                <Card.Text>
                  <p><strong>Email: </strong>{currentUser.email}</p>
                  <p><strong>Mobile: </strong>{currentUser.mobile}</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Row>
              <Col className="d-grid gap-2">
                <Button className="mt-3" variant="dark" size="md">
                  Sign Out
                </Button>
              </Col>
              <Col className="d-grid gap-2">
                <Button className="mt-3" variant="secondary" size="md">
                  Reset Password
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
