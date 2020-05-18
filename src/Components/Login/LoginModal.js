import React from "react"
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap"

function LoginModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={props.handleChange}
                                />
                            </Form.Group>
                        </Col>{" "}
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={props.handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {props.wrong && (
                            <span style={{ color: "red", margin: 20 }}>
                                wrong email or password!
                            </span>
                        )}
                        {/* <Col>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            label="Check me out"
                                        />
                                    </Form.Group>
                                </Col> */}
                    </Row>
                </Container>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => props.handleShow("register")}
                    >
                        Register
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={props.handleSubmit}
                    >
                        Login
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default LoginModal
