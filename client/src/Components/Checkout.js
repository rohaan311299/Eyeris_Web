import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { TextField } from '@material-ui/core';

const Checkout = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.cart) {
        let products = [];
        currentUser.cart.forEach((item) => {
          products.push(item.product);
        });
        setProducts(products);
      }
    }
  }, []);

  function submitOrder() {
    console.log('HOLA');
    const token = currentUser.token
      ? currentUser.token
      : localStorage.getItem('eyerisToken');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append('Cookie', 'token=' + token);
    var raw = JSON.stringify({
      totalPrice: currentUser.totalPrice,
      address: address,
      products: products,
      detailedrder: currentUser.cart,
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:5000/api/v1/order/createOrder', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getCurrentUser();
        setAddress('');
      })
      .catch((error) => console.log('error', error));
  }

  function getCurrentUser() {
    const token = currentUser.token
      ? currentUser.token
      : localStorage.getItem('eyerisToken');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append('Cookie', 'token=' + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    console.log(myHeaders);
    fetch('http://localhost:5000/api/v1/user/me', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        result['token'] = token;
        if (result._id !== undefined && result._id !== null && result._id) {
          // setIsLoggedIn(true);
          if (!result.cart) {
            result.cart = [];
          }
          setCurrentUser(result);
        } else {
          setCurrentUser(null);
          console.log('No user');
          localStorage.removeItem('eyerisToken');
        }
      })
      .catch((error) => console.log('error', error));
  }
  function handleChange(event) {
    setAddress(event.target.value);
  }
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
            <TextField
              placeholder="Enter Address"
              label="Address"
              fullWidth
              value={address}
              onChange={handleChange}
            />
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
              <Button onClick={submitOrder}> Confirm Order</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
