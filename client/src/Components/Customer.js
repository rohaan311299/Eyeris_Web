import React from 'react';
import {Row, Col, Card} from "react-bootstrap";

const Customer = (props) => {
    return (
        <div>
            <Card className="m-3">
                <Row>
                    <Col>
                        <h4 className="ml-3">Cart</h4>
                        <ul>
                            <li>Order 1</li>
                            <li>Order 2</li>
                            <li>Order 3</li>
                        </ul>
                    </Col>
                    <Col>
                        <h4>Customer Details</h4>
                        <ul>
                            <li>{props.name}</li>
                            <li>{props.address}</li>
                            <li>{props.phone}</li>
                            <li>{props.email}</li>
                        </ul>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Customer;
