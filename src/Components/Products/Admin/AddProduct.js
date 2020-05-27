import React from "react"
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Accordion,
    Image,
} from "react-bootstrap"

function AddProduct(props) {
    return (
        <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            {props.product.ID === null ? "Add" : "Edit"} Product
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Form>
                    <Container>
                        {/* <Row>
                                    <Col>
                                        <Form.Group>
                                            {this.props.categories !==
                                                undefined && (
                                                <DropdownButton
                                                    id="dropdown-basic-button"
                                                    title={"cat"}
                                                >
                                                    {this.props.categories.map(
                                                        (c) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        this.changeValue(
                                                                            "category",
                                                                            c.ID
                                                                        )
                                                                    }
                                                                    key={c.ID}
                                                                >
                                                                    {c.name}
                                                                </Dropdown.Item>
                                                            )
                                                        }
                                                    )}
                                                </DropdownButton>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row> */}
                        <Row>
                            <Col>
                                {props.product.images.map((img) => {
                                    return (
                                        <Image
                                            key={img.name}
                                            src={"images/" + img.name}
                                        />
                                    )
                                })}
                            </Col>{" "}
                        </Row>
                        <Row>
                            <Col>
                                <input type="file" onChange={props.onAddFile} />
                            </Col>{" "}
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={props.product.name}
                                        onChange={props.changeValue}
                                    />
                                </Form.Group>
                            </Col>{" "}
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="2"
                                        name="shortDescription"
                                        value={props.product.shortDescription}
                                        onChange={props.changeValue}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        name="description"
                                        value={props.product.description}
                                        onChange={props.changeValue}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                label="Active"
                                                onChange={(e) =>
                                                    this.changeValue(
                                                        "active",
                                                        !this.state.product
                                                            .active * 1
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row> */}
                    </Container>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={props.newProduct}
                    >
                        {props.product.ID === null ? "Add" : "Save"}
                    </Button>
                </Form>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default AddProduct
