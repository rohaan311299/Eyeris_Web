import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from './data';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
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

    fetch('http://localhost:5000/api/v1/product/getAll', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        console.log(result, result['data']);
        setProducts(result.data);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <div>
      <h3>Our Products:</h3>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={4}>
            <Card style={{ width: '18rem' }} className="mb-3">
              <Link to={`/product/${product._id}`}>
                <Card.Img
                  variant="top"
                  src={
                    (product.img =
                      product.img === undefined || product.img === null
                        ? 'https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg'
                        : product.img)
                  }
                  alt={product.name}
                />
              </Link>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
