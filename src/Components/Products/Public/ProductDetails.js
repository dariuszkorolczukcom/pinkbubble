import React from "react"
import { Container, Card, Button, Row, Col } from "react-bootstrap"
import { withRouter } from "react-router-dom"
// import axios from "axios"
import { useHttpGet } from "../../../hooks/http"
import { useParams } from "react-router-dom"

const style = {
    margin: "10px",
    minWidth: "200px",
}

const ProductDetails = (props) => {
    let { id } = useParams()
    const [isLoading, fetchedData] = useHttpGet("product/" + id, [id])
    let product = null
    let addProductToCart = props.addProductToCart
    if (fetchedData !== null) product = fetchedData.data

    return (
        <Container>
            {!isLoading && product !== null && (
                <Card>
                    <Row>
                        <Col>
                            {product.images !== null &&
                                product.images !== undefined &&
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
                                )}
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Subtitle>
                                    {/* <del>£{props.product.price + 1}</del>{" "} */}
                                    <span style={{ color: "red" }}>
                                        £{product.price}
                                    </span>
                                </Card.Subtitle>
                                <Card.Text>{product.description}</Card.Text>
                                <Button
                                    variant="secondary"
                                    onClick={() => addProductToCart(product.ID)}
                                    block
                                >
                                    Add to Order
                                </Button>
                            </Card.Body>
                        </Col>
                        s
                    </Row>
                </Card>
            )}
        </Container>
    )
}

export default withRouter(ProductDetails)
