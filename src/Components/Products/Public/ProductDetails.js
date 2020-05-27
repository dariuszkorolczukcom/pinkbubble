import React, { Component } from "react"
import { Container, Card, Button, Row, Col } from "react-bootstrap"
import { withRouter } from "react-router-dom"
import axios from "axios"
const style = {
    margin: "10px",
    minWidth: "200px",
}
const headers = {
    "Access-Control-Allow-Origin": "*",
}

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: parseInt(props.location.pathname.split("/")[2]),
            show: false,
        }
    }
    componentDidMount() {
        let status = 0
        let product = {
            ID: this.state.id,
        }
        console.log(product)
        axios
            .get("http://localhost:8080/product/" + this.state.id)
            .then((res) => {
                product = res.data
                status = res.status
            })
            .catch(function (error) {
                console.log(error)
                status = error.response ? error.response.status : 0
            })
            .finally(() => {
                console.log(status)
                switch (status) {
                    case 200:
                        console.log("success!")
                        console.log(product)
                        this.setState({
                            product: product,
                            show: true,
                        })
                        break
                    case 401:
                        console.log("not permitted!")
                        this.setState({
                            wrong: true,
                        })
                        break
                    default:
                        console.log("server error")
                }
            })
    }

    render() {
        // let addProductToCart
        // let ID
        // let name
        // let price
        // let img
        // let images
        // let description
        // if (this.state.show) {
        //     addProductToCart = this.props.addProductToCart
        //     ID = this.state.product.ID
        //     name = this.state.product.name
        //     price = this.state.product.price
        //     img = this.state.product.img
        //     images = this.state.product.images
        //     description = this.state.product.description
        // }
        return (
            this.state.show && (
                <Container>
                    <Card>
                        <Row>
                            <Col>
                                {this.state.product.images !== null &&
                                    this.state.product.images !== undefined &&
                                    this.state.product.images.length > 0 && (
                                        <Card.Img
                                            variant="top"
                                            width="100%"
                                            key={
                                                this.state.product.images[0]
                                                    .name
                                            }
                                            src={
                                                process.env
                                                    .REACT_APP_S3_BUCKET +
                                                this.state.product.images[0]
                                                    .name
                                            }
                                        />
                                    )}
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>
                                        {this.state.product.name}
                                    </Card.Title>
                                    <Card.Subtitle>
                                        {/* <del>£{props.product.price + 1}</del>{" "} */}
                                        <span style={{ color: "red" }}>
                                            £{this.state.product.price}
                                        </span>
                                    </Card.Subtitle>
                                    <Card.Text>
                                        {this.state.product.description}
                                    </Card.Text>
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            this.props.addProductToCart(
                                                this.state.product.ID
                                            )
                                        }
                                        block
                                    >
                                        Add to Order
                                    </Button>
                                </Card.Body>
                            </Col>
                            s
                        </Row>
                    </Card>
                </Container>
            )
        )
    }
}

export default withRouter(ProductDetails)
