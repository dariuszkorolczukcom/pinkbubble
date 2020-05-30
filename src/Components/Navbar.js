import React, { Component } from "react"
import { Navbar, Nav } from "react-bootstrap"
import "./Navbar.css"
import Login from "./Login/Login"

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fixed: false,
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.listenToScroll)
    }

    listenToScroll = () => {
        this.setState({
            NavbarPosition: document
                .querySelector("#navbarUnit")
                .getBoundingClientRect()["top"],
            JumbotronPosition: document
                .querySelector("#jumbotronUnit")
                .getBoundingClientRect()["bottom"],
        })
        this.shouldBeFixed()
    }

    shouldBeFixed = () => {
        if (this.state.fixed && this.state.JumbotronPosition > 0) {
            this.setState({
                fixed: false,
            })
        } else if (this.state.NavbarPosition <= 0) {
            this.setState({
                fixed: true,
            })
        }
    }

    render() {
        return (
            <Navbar
                key="navbarUnit"
                id="navbarUnit"
                bg="light"
                expand="md"
                style={style.nav}
                fixed={this.state.fixed ? "top" : ""}
            >
                <Navbar.Brand href="/">pinkbubble</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav justify>
                        <Nav.Link href="/checkout">checkout</Nav.Link>
                        <Nav.Link href="/products">products</Nav.Link>
                        <Nav.Link href="/users">users</Nav.Link>
                        <Login />
                        {this.props.cartSize}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const style = {
    nav: {
        width: "100%",
        backgroundColor: "rgba(200,100,100,.8)",
    },
}

export default NavbarComponent
