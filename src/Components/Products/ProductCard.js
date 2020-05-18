import React from "react"
import { Card, Button } from "react-bootstrap"

const style = {
    margin: "10px",
    minWidth: "200px",
    maxWidth: "445px",
}
const ProductCard = (props) => {
    return (
        <Card style={style} xs={12} sm={6} md={4} xl={3}>
            {props.product.img ? (
                <Card.Img
                    variant="top"
                    width="100%"
                    src={props.product.img}
                    alt="Card image cap"
                />
            ) : (
                ""
            )}
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Subtitle>
                    <del>£{props.product.price + 1}</del>{" "}
                    <span style={{ color: "red" }}>£{props.product.price}</span>
                </Card.Subtitle>
                <Card.Text>{props.product.description}</Card.Text>
                <Button onClick={() => props.addProduct(props.product.ID)}>
                    Add to Order
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
