import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

const Product = (props) => {
  const [item, setItem] = useState({});
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let productId = props.match.params.id;
    console.log(productId, currentUser);
    const token = currentUser
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

    fetch('http://localhost:5000/api/v1/product/' + productId, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        setItem(result.data);
        if (result.data === undefined) {
          <Redirect to={'/products'} />;
        }
        console.log(result.data);
      })
      .catch((error) => console.log('error', error));
  }, []);

  function arrayBufferToBase64(buffer) {
    console.log(buffer);
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    console.log(binary);
    return window.btoa(binary);
  }

  function imageDisplay(data) {
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(data);
    var image = base64Flag + imageStr;
    console.log(image);
    return image;
  }

  function handleChange(event) {
    setQuantity(event.target.value);
    console.log(quantity);
  }

  function addToCart() {
    let itemAdded = {
      id: item._id,
      name: item.name,
      category: item.category,
      quantity: quantity,
      price: quantity * item.price,
    };
    console.log(itemAdded);
    let orders = currentUser.orders;
    orders.push(item);
    setCurrentUser({ ...currentUser, orders: orders });
    let cart = currentUser.cart;
    cart.push(itemAdded);
    setCurrentUser({ ...currentUser, cart: cart });
  }

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Back to Products
      </Link>
      <Row className="pt-3">
        <Col sm={12} md={6}>
          <img
            src={item.image ? imageDisplay(item.image.imageData.data) : ''}
            style={{ width: '80%', height: 'auto' }}
          />
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Row style={{ textAlign: 'center' }}>
                <Col className="d-grid gap-2">
                  <Button variant="dark" className="m-3">
                    {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </Button>
                </Col>
                <Col className="d-grid gap-2">
                  <Button variant="dark" className="m-3">
                    Rs. {item.price}
                  </Button>
                </Col>
                <Col className="d-grid gap-2">
                  <Button variant="dark" className="m-3">
                    {item.category}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>Qty:</Col>
                <Col>
                  <Form.Group>
                    <Form.Control as="select" size="md" onChange={handleChange} style={{backgroundColor:"white"}}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              className="mt-3"
              onClick={addToCart}
            >
              <i className="fas fa-shopping-cart"></i> Add To Cart
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Product;
