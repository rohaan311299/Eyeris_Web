import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (currentUser) {
      setOrders(currentUser.orders);
      console.log(currentUser.orders);
    }
  });
  return (
    <div>
      <div className="container">
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <img
              style={{ height: '75%', width: 'auto' }}
              src="https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
            />
          </Col>
          <Col sm={12} md={6}>
            <h1>Rohan Kacheria</h1>

            <h4>Your Cart Items:</h4>
            <ListGroup>
              {orders.map((item) => {
                console.log(item);
                return (
                  <ListGroup.Item>
                    {item.name} ===> {item.quantity} ===> {item.price}
                    {'===> '}
                    <i class="fas fa-trash"></i>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>

            <Row>
              <Col className="d-grid gap-2">
                <Button className="mt-3" variant="dark" size="md">
                  Proceed to checkout
                </Button>
              </Col>
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
