import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';

const Orders = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setCartItems(currentUser.cart);
      let total = 0;
      let cartDB = [];
      currentUser.cart.forEach((item) => {
        total += item.price;
        let obj = {
          product: item.id,
          name: item.name,
          quantity: parseInt(item.quantity),
          price: item.price,
        };
        cartDB.push(obj);
      });
      let orderId = [];
      currentUser.orders.forEach((item) => {
        orderId.push(item);
      });

      setTotalValue(total);
      setCart(cartDB);
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

  function confirmOrder() {}

  function getOrderDetails(id) {}

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
            <h4>Your Orders: </h4>

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

export default Orders;
