import React from 'react';
import {Card, Row, Col, ListGroup, Button} from "react-bootstrap";

const Profile = () => {
  return (
    <div>
      <div className="container">
        <Row className="mt-3">
          <Col sm={12} md={6} >
            <img style={{height:"75%", width:"auto"}} src="https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"/>
          </Col>
          <Col sm={12} md={6}>
            <h1>Rohan Kacheria</h1>

            <h4>Your Cart Items:</h4>
            <ListGroup>
              <ListGroup.Item>Item 1 <i class="fas fa-trash"></i></ListGroup.Item>
              <ListGroup.Item>Item 2 <i class="fas fa-trash"></i></ListGroup.Item>
              <ListGroup.Item>Item 3 <i class="fas fa-trash"></i></ListGroup.Item>
              <ListGroup.Item>Item 4 <i class="fas fa-trash"></i></ListGroup.Item>
              <ListGroup.Item>Item 5 <i class="fas fa-trash"></i></ListGroup.Item>
            </ListGroup>

            <div>
              <Button className="m-3" variant="success">Proceed to checkout</Button>
              <Button className="m-3" variant="primary">Sign Out</Button>
              <Button className="m-3" variant="danger">Reset Password</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
