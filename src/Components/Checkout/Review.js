import React from 'react';
import { Container, Row, ListGroup, Button } from "react-bootstrap"

export default function Review(props) {

  return (
    <Container>
      <Row>
        Order summary
      </Row>
      <ListGroup disablePadding>
        {props.products.map((product) => (
          <ListGroup.Item key={product.name}>
            {product.name} {product.desc}
            {product.price}
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          Total:
            $34.06
        </ListGroup.Item>
      </ListGroup>
        <Row xs={12} sm={6}>
            Shipping
            {Object.keys(props.address).map((v)=>{
              return (props.address[v] + ', \n')
            })}
        </Row>
        <Row xs={12} sm={6}>
            Payment details
          <Row>
            
              <Container key={props.payment.cardName}>
                <Row xs={6}>
                  {props.payment.cardNumber}
                </Row>
              </Container>
            
          </Row>
        </Row>
    </Container>
  );
}