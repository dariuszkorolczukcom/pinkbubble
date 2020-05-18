import React, { Component } from "react"
import { Container, Row, Col, Form, Button, Accordion } from "react-bootstrap"
import apiQueries from "../Api/Factory"

class AddEditCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                ID: null,
                name: "",
                description: "",
            },
        }
    }

    componentDidMount() {
        if (this.props.product) {
            this.setState({
                product: this.props.product,
            })
        }
    }

    changeValue(field, value) {
        let product = this.state.product
        product[field] = value
        this.setState({
            product: product,
        })
    }

    processProduct = () => {
        this.state.product.ID === null
            ? apiQueries.addCategory(this.state.product)
            : apiQueries.editCategory(this.state.product)
    }

    render() {
        return (
            <Container style={{ backgroundColor: "white" }}>
                <Accordion>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Add Category
                    </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.name}
                                            onChange={(e) =>
                                                this.changeValue(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>{" "}
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={this.state.description}
                                            onChange={(e) =>
                                                this.changeValue(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={() => {
                                this.processProduct()
                            }}
                        >
                            Add
                        </Button>
                    </Form>
                </Accordion.Collapse>
                </Accordion>
            </Container>
        )
    }
}

export default AddEditCategory
