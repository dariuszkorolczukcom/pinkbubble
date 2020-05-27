import React from "react"
import ProductCard from "./ProductCard"
import { Container, Row, Col } from "react-bootstrap"

const ProductList = (props) => {
    let products = props.products
    let addProductToCart = props.addProductToCart
    return (
        <Container>
            <Row>
                {products.map((product) => {
                    return (
                        <Col key={product.ID} xs={12} md={6} xl={4}>
                            <ProductCard
                                product={product}
                                addProductToCart={addProductToCart}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ProductList
