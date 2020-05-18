import React, { Fragment, Component } from "react"
import { Button } from "react-bootstrap"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import axios from "axios"
import Cookie from "js-cookie"

const token = Cookie.get("token") ? Cookie.get("token") : null

const initialState = () => {
    return {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        show: "",
        wrong: false,
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = initialState()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.signIn = this.signIn.bind(this)
        this.register = this.register.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }
    handleChange(e) {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value,
        })
    }
    setShow(show) {
        this.setState({
            show: show,
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.signIn(this.state.email, this.state.password)
    }
    handleRegister(e) {
        e.preventDefault()
        this.register(this.state.email, this.state.password)
    }
    signIn() {
        let status = 0
        let email = this.state.email
        let password = this.state.password
        return axios
            .post("http://localhost:8080/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                Cookie.set("token", res.data.token)
                status = res.status
            })
            .catch((error) => {
                console.log(error)
                status = error.response ? error.response.status : 0
            })
            .finally(() => {
                console.log(status)
                switch (status) {
                    case 200:
                        console.log("success!")
                        this.setState(initialState)
                        this.handleClose()
                        window.location.reload()
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
    register() {
        let status = 0
        let email = this.state.email
        let password = this.state.password
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        return axios
            .post("http://localhost:8080/register", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            })
            .then((res) => {
                Cookie.set("token", res.data.token)
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
                        this.setState(initialState)
                        this.handleClose()
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
    handleLogout() {
        Cookie.set("token", "")
        window.location.reload()
    }
    handleClose() {
        this.setShow("")
    }
    handleShow(show) {
        this.setShow(show)
    }
    render() {
        const show = this.state.show
        return (
            <Fragment>
                {token === null ? (
                    <Fragment>
                        <Button
                            variant="primary"
                            onClick={() => this.handleShow("login")}
                        >
                            Login
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => this.handleShow("register")}
                        >
                            Register
                        </Button>
                    </Fragment>
                ) : (
                    <Button variant="primary" onClick={this.handleLogout}>
                        Logout
                    </Button>
                )}
                <LoginModal
                    show={show === "login"}
                    wrong={this.state.wrong}
                    handleShow={this.handleShow}
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <RegisterModal
                    show={show === "register"}
                    wrong={this.state.wrong}
                    handleShow={this.handleShow}
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleRegister}
                />
            </Fragment>
        )
    }
}

export default Login