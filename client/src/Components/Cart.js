import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const Cart = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (currentUser) {
      setOrders(currentUser.cart);
      let total = 0;
      let cartDB = [];
      currentUser.cart.forEach((item) => {
        total += item.price;
        let obj = {
          product: item.id,
          quantity: parseInt(item.quantity),
          price: item.price,
        };
        cartDB.push(obj);
      });
      // .then(() => {
      setTotalValue(total);
      setCart(cartDB);
      // });
    }
  }, []);

  function saveCart() {
    const token = currentUser.token
      ? currentUser.token
      : localStorage.getItem('eyerisToken');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    myHeaders.append('Cookie', 'token=' + token);

    var raw = JSON.stringify({
      cart: cart,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:5000/api/v1/user/createCart', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
  return (
    <div>
      <div className="container">
        <Row className="mt-3">
          <Col sm={12} md={2}>
          </Col>
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
                {orders.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>{orders.indexOf(item) + 1}</td>
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
                <Button className="mt-3" variant="dark" size="md">
                  Proceed to checkout
                </Button>
              </Col>
              <Col className="d-grid gap-2">
                <Button
                  className="mt-3"
                  variant="dark"
                  size="md"
                  onClick={saveCart}
                >
                  Save Cart
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
