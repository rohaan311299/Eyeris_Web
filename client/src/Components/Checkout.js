import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { TextField } from '@material-ui/core';

const Checkout = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (currentUser) {
    }
  }, []);

  return (
    <div>
      <div className="container">
        <LinkContainer to="/cart">
          <Button className="mt-3" variant="dark">
            Back to Cart
          </Button>
        </LinkContainer>
        <Row className="mt-3">
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <h1>{currentUser.name}</h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <h4>Enter Address Details </h4>
            <TextField placeholder="Enter Address" label="Address" fullWidth />
            <div className="mt-3">
              <p>
                <strong>Important Points to note</strong>
              </p>
              <ul>
                <li>
                  Attach a screenshot of the Final Bill in the google form
                </li>
                <li>
                  Transfer the final amount to the following GPAY account:{' '}
                </li>
                <li>
                  Attach a screenshot of the succesfull transaction in the
                  google form
                </li>
                <li style={{ color: 'green' }}>
                  Wait for one of us to confirm that your order has been
                  succesfuly placed
                </li>
                <li style={{ color: 'red' }}>
                  In case of any discrepancy, the money will be refunded
                  completely
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
