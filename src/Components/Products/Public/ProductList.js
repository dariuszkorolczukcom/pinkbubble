import React from "react"
import ProductCard from "./ProductCard"
import { Container, Row, Col } from "react-bootstrap"
import { useHttpGet } from "../../../hooks/http"

const ProductList = (props) => {
    const [isLoading, fetchedData] = useHttpGet("products", [])
    let addProductToCart = props.addProductToCart
    let products = null

    if (fetchedData !== null) products = fetchedData.data

    return (
        <Container>
            <Row>
                {!isLoading &&
                    products !== null &&
                    products.map((product) => {
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
