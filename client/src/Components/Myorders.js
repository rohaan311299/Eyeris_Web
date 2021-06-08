import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Router } from 'react-router';

const Myorders = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(1);
    if (currentUser) {
      console.log(currentUser);
    }
  }, []);

  return (
    <div>
      <div className="container">
        <LinkContainer to="/">
          <Button className="mt-3" variant="dark">
            Back to Products
          </Button>
        </LinkContainer>
        <Row className="mt-3">
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <h1>{currentUser.name}</h1>
            <h4>Your Cart Items: {totalValue}</h4>

            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>{cartItems.indexOf(item) + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>

            <Row>
              <Col className="d-grid gap-2">
                <Link to="/checkout">
                  <Button className="mt-3" variant="dark">
                    Confirm Order
                  </Button>
                </Link>
              </Col>
              <Col className="d-grid gap-2">
                <Button className="mt-3" variant="dark">
                  Save Cart for Later
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Myorders;
