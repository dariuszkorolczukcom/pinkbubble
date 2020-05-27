import React from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const style = {
    margin: "10px",
    minWidth: "200px",
    maxWidth: "445px",
}
const ProductCard = (props) => {
    let addProductToCart = props.addProductToCart
    let ID = props.product.ID
    let name = props.product.name
    let price = props.product.price
    let img = props.product.img
    let images = props.product.images
    let description = props.product.description
    return (
        <Card style={style}>
            {img !== null && img ? (
                <Card.Img
                    variant="top"
                    width="100%"
                    src={process.env.REACT_APP_S3_BUCKET+img}
                    alt="Card image cap"
                />
            ) : (
                images !== null &&
                images.length > 0 && (
                    <Card.Img
                        variant="top"
                        width="100%"
                        key={images[0].name}
                        src={process.env.REACT_APP_S3_BUCKET + images[0].name}
                    />
                )
            )}
            <Card.Body>
                <Link to={"/products/" + ID}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>
                        {/* <del>£{props.product.price + 1}</del>{" "} */}
                        <span style={{ color: "red" }}>£{price}</span>
                    </Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                </Link>
                <Button
                    variant="secondary"
                    onClick={() => addProductToCart(ID)}
                    block
                >
                    Add to Order
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
