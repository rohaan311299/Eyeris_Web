import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom"
import products from "./data";

const Products = () => {
  // let products = [
  //   {
  //     id:1,
  //     name:"Name1",
  //     description:"Some Basic Description",
  //     img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
  //   },
  //   {
  //     id:2,
  //     name:"Name1",
  //     description:"Some Basic Description",
  //     img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
  //   },
  //   {
  //     id:3,
  //     name:"Name1",
  //     description:"Some Basic Description",
  //     img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
  //   },
  //   {
  //     id:4,
  //     name:"Name1",
  //     description:"Some Basic Description",
  //     img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
  //   },
  //   {
  //     id:5,
  //     name:"Name1",
  //     description:"Some Basic Description",
  //     img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
  //   },
  //   {
  //     id:6,
  //     name:"Name1",
  //     description:"Some Basic Description",
  //     img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
  //   }
  // ];
  return (
    <div>
      <h3>Our Products:</h3>
      <Row>
      {products.map((product) => (
          <Col sm={12} md={4}>
            <Card style={{width:"18rem"}} className="mb-3">
              <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={product.img} alt={product.name} />
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