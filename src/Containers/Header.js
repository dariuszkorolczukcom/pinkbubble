import React from "react"
import { Container, Row, Col, Jumbotron } from "react-bootstrap"

const Header = () => {
    return (
            <Jumbotron id="jumbotronUnit" bg="light" style={style.main} fluid>
                <Container fluid>
                    <Row>
                        <Col>
                            <p style={style.rest} className="lead">
                                We offer a range of hand made beauty products
                            </p>
                        </Col>
                    </Row>
                    <hr style={style.rest} className="my-2" />
                    <Row>
                        <Col>
                            <p style={style.rest}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
    )
}

const style = {
    main: {
        width: "100%",
        padding:"1rem"
    },
    rest: {
        opacity: 1,
    },
}

export default Header
