import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

const Product = (props) => {
  const [item, setItem] = useState({});
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    let productId = props.match.params.id;
    console.log(productId, currentUser);
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

    fetch('http://localhost:5000/api/v1/product/' + productId, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        setItem(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log('error', error));
  }, []);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row className="pt-3">
        <Col sm={12} md={6}>
          <img
            src="https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
            style={{ width: '80%', height: 'auto' }}
          />
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Row style={{ textAlign: 'center' }}>
                <Col sm={4}>
                  <Button variant="danger" className="m-3">
                    {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button variant="success" className="m-3">
                    Rs. {item.price}
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button variant="info" className="m-3">
                    {item.category}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>Qty:</Col>
                <Col>
                  <Form.Group>
                    <Form.Control as="select" size="md">
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
          <Button variant="warning" className="mt-3">
            <i className="fas fa-shopping-cart"></i> Add To Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Product;
