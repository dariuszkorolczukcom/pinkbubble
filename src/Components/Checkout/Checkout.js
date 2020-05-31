import React, { Component } from "react"
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import Review from "./Review"
import { Container, Row, Button } from "react-bootstrap"

const products = [
    { name: "Product 1", desc: "A nice thing", price: "$9.99" },
    { name: "Product 2", desc: "Another thing", price: "$3.45" },
    { name: "Product 3", desc: "Something else", price: "$6.51" },
    { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
    { name: "Shipping", desc: "", price: "Free" },
]
const address = {
    email: "my@mail.com",
    firstName: "My first name",
    lastName: "mylastname",
    address1: "1 Material-UI Drive",
    address2: "Reactville",
    city: "Anytown",
    county: "Lewisham",
    postCode: "99999",
}
const payment = {
    cardType: "Visa",
    cardName: "Mr John Smith",
    cvv: "321",
    cardNumber: "xxxx-xxxx-xxxx-1234",
    expDate: "04/2024",
}

const steps = ["Shipping address", "Payment details", "Review your order"]

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            products: products,
            payment: payment,
            address: address,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onAddressChange = this.onAddressChange.bind(this)
        this.onPaymentChange = this.onPaymentChange.bind(this)
    }

    onAddressChange(e) {
        let address = this.state.address
        address[e.target.name] = e.target.value
        this.setState({
            addres: address,
        })
    }

    onPaymentChange(e) {
        let payment = this.state.payment
        payment[e.target.name] = e.target.value
        this.setState({
            payment: payment,
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        alert("Form submitted!")
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <AddressForm
                        onChnge={this.onAddressChange}
                        address={this.state.address}
                    />
                )
            case 1:
                return (
                    <PaymentForm
                        onChange={this.onPaymentChange}
                        payment={this.state.payment}
                    />
                )
            case 2:
                return (
                    <Review
                        payment={this.state.payment}
                        address={this.state.address}
                        products={this.state.products}
                        onSubmit={this.handleSubmit}
                    />
                )
            default:
                throw new Error("Unknown step")
        }
    }

    setActiveStep = (step) => {
        if (step >= 0) {
            this.setState({
                activeStep: step,
            })
        }
    }

    handleNext = () => {
        this.setActiveStep(this.state.activeStep + 1)
    }

    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1)
    }

    render() {
        let activeStep = this.state.activeStep
        return (
            <Container style={{ backgroundColor: "white" }}>
                <Row>
                    <h1>Submit an Order</h1>
                </Row>
                <Row>
                    {steps.map((label, index) => (
                        <div key={label}>
                            <Button
                                onClick={(index) => this.setActiveStep(index)}
                            >
                                {label}
                            </Button>
                        </div>
                    ))}
                </Row>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            Thank you for your order. Your order number is
                            #2001539. We have emailed your order confirmation,
                            and will send you an update when your order has
                            shipped.
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {this.getStepContent(activeStep)}
                            <div>
                                {activeStep !== 0 && (
                                    <Button onClick={this.handleBack}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={
                                        activeStep === steps.length - 1
                                            ? this.handleSubmit
                                            : this.handleNext
                                    }
                                >
                                    {activeStep === steps.length - 1
                                        ? "Process"
                                        : "Next"}
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </Container>
        )
    }
}

export default Checkout
