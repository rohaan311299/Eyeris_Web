import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, ListGroup, Form, Button,Card} from "react-bootstrap";

const product={
      img:"https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg"
    }

const Product = ({match}) => {

    return (
        <>
            <Link className="btn btn-dark my-3" to="/products">Go Back</Link>
            <Row className="pt-3">
                <Col sm={12} md={6}>
                    <img src="https://miro.medium.com/max/3150/1*TQw2_wmdWlXYXVSsz45Kdw.jpeg" style={{width:"80%", height:"auto"}} />
                </Col>
                <Col sm={12} md={6}>
                    {/* <ListGroup variant="flush">
                    <ListGroup.Item><strong>Product Name</strong></ListGroup.Item>
                    <ListGroup.Item>Price: Rs. 100</ListGroup.Item>
                    <ListGroup.Item>Description: Product Description</ListGroup.Item>
                    <ListGroup.Item>Category: Product Category</ListGroup.Item>
                    <ListGroup.Item>product in Stock?</ListGroup.Item>
                    <ListGroup.Item>
                        Qty: 
                        <Form.Group>
                        <Form.Control as="select" size="md">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        <br />
                        </Form.Group>
                    </ListGroup.Item>
                    </ListGroup> */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Product Name</Card.Title>
                            <Card.Text>
                                acon ipsum dolor amet tenderloin drumstick andouille, pork belly doner burgdoggen ham hock t-bone ball tip beef. Shank swine sirloin ham frankfurter shoulder salami doner bresaola. Short loin flank doner filet mignon turkey burgdoggen swin
                            </Card.Text>
                            <Row style={{textAlign:"center"}}>
                                <Col sm={4}>
                                    <Button variant="danger" className="m-3">In Stock</Button>
                                </Col>
                                <Col sm={4}>
                                    <Button variant="success" className="m-3">Rs. 1000</Button>
                                </Col>
                                <Col sm={4}>
                                    <Button variant="info" className="m-3">Category</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Qty:
                                </Col>
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
                    <Button variant="warning" className="mt-3" ><i className="fas fa-shopping-cart"></i> Add To Cart</Button>
                </Col>
            </Row>
        </>
    )
}

export default Product;