import React, { Component } from "react"
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"
import "./Navbar.css"
import Login from "./Login/Login"

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            watchJumbo: false,
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.listenToScroll)
    }

    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        const scrolled = winScroll / height
        this.setState({
            scrollPosition: scrolled,
            NavbarPosition: document
                .querySelector("#navbarUnit")
                .getBoundingClientRect()["top"],
            JumbotronPosition: document
                .querySelector("#jumbotronUnit")
                .getBoundingClientRect()["bottom"],
            watchJumbo: true,
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
        let stopBubbles = this.props.stopBubbles
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
                        {/* <Nav.Link href="/categories">categories</Nav.Link> */}
                        <Nav.Link href="/users">users</Nav.Link>
                        {/* <NavDropdown title="Categories" id="basic-nav-dropdown"> */}
                        {/* {this.props.categories && this.props.categories.length ? this.props.categories.map((category) => {
                                return (
                                    <NavDropdown.Item
                                        key={category.name}
                                        href={"#" + category.name}
                                    >
                                        {category.name.charAt(0).toUpperCase() +
                                            category.name.slice(1)}
                                    </NavDropdown.Item>
                                )
                            }) : ""} */}
                        {/* </NavDropdown> */}
                        <Login />
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
