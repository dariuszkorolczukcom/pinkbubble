import React from "react"
import { Container, Row, Form } from "react-bootstrap"

const fields = [
    {
        label: "Card Type",
        name: "cardType",
        placeholder: "",
        required: true,
    },
    {
        label: "Name on card",
        name: "cardName",
        placeholder: "",
        required: true,
    },
    {
        label: "Card Number",
        name: "cardNumber",
        placeholder: "",
        required: true,
    },
    {
        label: "Card Expiration Date",
        name: "expDate",
        placeholder: "",
        required: true,
    },
    {
        label: "CVV",
        name: "cvv",
        placeholder: "",
        required: true,
    },
]

function PaymentForm(props) {
    return (
        <Container>
            <Row variant="h6" gutterBottom>
                Payment method
            </Row>
            <Form>
                {fields.map((field) => {
                    return (
                        <Row xs={12}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    value={props.payment[field.name]}
                                    type={field.type ? field.type : "text"}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    onChange={props.onChange}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>
                        </Row>
                    )
                })}
            </Form>
        </Container>
    )
}

export default PaymentForm;