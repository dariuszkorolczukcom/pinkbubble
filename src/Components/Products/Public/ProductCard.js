import React from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const style = {
    margin: "10px",
    minWidth: "200px",
    maxWidth: "445px",
}
const ProductCard = (props) => {
    const { product } = props

    let addProductToCart = props.addProductToCart

    return (
        <Card style={style}>
            {product.img !== null && product.img ? (
                <Card.Img
                    variant="top"
                    width="100%"
                    src={process.env.REACT_APP_S3_BUCKET + product.img}
                    alt="Card image cap"
                />
            ) : (
                product.images !== null &&
                product.images.length > 0 && (
                    <Card.Img
                        variant="top"
                        width="100%"
                        key={product.images[0].name}
                        src={
                            process.env.REACT_APP_S3_BUCKET +
                            product.images[0].name
                        }
                    />
                )
            )}
            <Card.Body>
                <Link to={"/products/" + product.ID}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle>
                        {/* <del>£{props.product.price + 1}</del>{" "} */}
                        <span style={{ color: "red" }}>£{product.price}</span>
                    </Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                </Link>
                <Button
                    variant="secondary"
                    onClick={() => addProductToCart(product.ID)}
                    block
                >
                    Add to Order
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
