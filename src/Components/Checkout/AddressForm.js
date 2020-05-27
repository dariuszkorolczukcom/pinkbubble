import React from "react"
import { Container, Row, Form } from "react-bootstrap"

const fields = [
    {
        label: "Email address",
        name: "email",
        type: "email",
        placeholder: "enter email",
        required: true,
    },
    {
        label: "First Name",
        name: "firstName",
        placeholder: "Name",
        required: true,
    },
    {
        label: "Last Name",
        name: "lastName",
        placeholder: "Surname",
        required: true,
    },
    {
        label: "First line of address",
        name: "address1",
        placeholder: "Address line 1",
        required: true,
    },
    {
        label: "Second line of address",
        name: "address2",
        placeholder: "Address line 2",
        required: true,
    },
    {
        label: "City",
        name: "city",
        placeholder: "City",
        required: true,
    },
    {
        label: "County",
        name: "county",
        placeholder: "County",
        required: true,
    },
    {
        label: "Valid UK Post Code",
        name: "postCode",
        placeholder: "Post Code",
        required: true,
    },
]
function AddressForm(props) {
    return (
        <Container>
            <Row>Shipping address</Row>
            <Form>
                {fields.map((field) => {
                    return (
                        <Row xs={12} key={field.name}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    value={props.address[field.name]}
                                    type={field.type ? field.type : "text"}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    onChange={props.onChange}
                                />
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text> */}
                            </Form.Group>
                        </Row>
                    )
                })}
            </Form>
        </Container>
    )
}

export default AddressForm
