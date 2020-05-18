import React from "react"
import ProductCard from "./ProductCard"
import { Container, Row, Col } from "react-bootstrap"

const ProductList = (props) => {
    return (
        <Container>
            <Row>
                {props.products.map((product) => {
                    return (
                        <Col key={product.ID}>
                            <ProductCard
                                product={product}
                                addProduct={props.addProduct}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ProductList
