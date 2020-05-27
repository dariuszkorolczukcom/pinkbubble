import React, { Fragment, Component } from "react"
import { Container, Row, Spinner } from "react-bootstrap"
import apiQueries from "../Api/Factory"
import NavbarComponent from "../Components/Navbar"
import "./App.css"
import Header from "./Header"
import Users from "../Components/Login/Users"
import ProductList from "../Components/Products/Public/ProductList"
import ProductDetails from "../Components/Products/Public/ProductDetails"
import AddEditProduct from "../Components/Products/Admin/AddEditProduct"
// import AddEditCategory from "../Components/AddEditCategory"
import Checkout from "../Components/Checkout/Checkout"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
} from "react-router-dom"
import Cookie from "js-cookie"
import axios from "axios"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const token = Cookie.get("token") ? Cookie.get("token") : null

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            fetching: true,
            cart: {},
            bubblesPlay: true,
            admin: false,
        }
        this.stopBubbles = this.stopBubbles.bind(this)
        this.addProductToCart = this.addProductToCart.bind(this)
    }

    componentDidMount() {
        // this.loadUser()
        this.load()
    }

    loadUser() {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + token,
            },
        }
        let status = 0
        axios
            .get("http://localhost:8080/hello", config)
            .then((res) => {
                console.log(res)
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
                        this.setState({ admin: true })
                        console.log("success!")
                        break
                    case 401:
                        console.log("not logged in!")
                        break
                    default:
                        console.log("server error")
                }
            })
    }

    async load() {
        this.setState({
            fetching: true,
        })
        let products = await apiQueries.getProducts()
        if (products !== null) {
            await this.setState({
                products: products,
                fetching: false,
            })
        }
    }

    addProductToCart(ID) {
        let cart = this.state.cart
        cart[ID] === undefined ? (cart[ID] = 1) : (cart[ID] += 1)
        this.setState(
            {
                cart: cart,
            },
            console.log(this.state.cart)
        )
    }

    stopBubbles() {
        console.log(this.state.bubblesPlay)
        this.setState({
            bubblesPlay: !this.state.bubblesPlay,
        })
    }

    render() {
        let bubblesPlay = this.state.bubblesPlay
        let fetching = this.state.fetching
        let products = this.state.products
        let stopBubbles = this.stopBubbles
        let addProductToCart = this.addProductToCart
        const { match, location, history } = this.props
        return (
            <Fragment>
                <video autoPlay={bubblesPlay} muted loop id="Video">
                    <source src="BubblesLoop.mp4" type="video/mp4" />
                </video>
                <Container>
                    <Row>
                        <Header />
                    </Row>
                    <Row>
                        <NavbarComponent
                            render={!fetching}
                            stopBubbles={stopBubbles}
                        />
                    </Row>
                    <Row>
                        <TransitionGroup>
                            <CSSTransition classNames="fade" timeout={300}>
                                <Switch>
                                    <Route exact path="/">
                                        {this.state.fetching && (
                                            <Spinner animation="grow" />
                                        )}
                                        {!this.state.fetching && (
                                            <ProductList
                                                products={products}
                                                addProductToCart={
                                                    addProductToCart
                                                }
                                            />
                                        )}
                                    </Route>
                                    <Route exact path="/products">
                                        <AddEditProduct />
                                    </Route>
                                    <Route path="/products/:id">
                                        <ProductDetails
                                            products={products}
                                            addProductToCart={addProductToCart}
                                        />
                                    </Route>
                                    {/* <Route path="/categories">
                            <AddEditCategory />
                        </Route> */}
                                    <Route path="/users">
                                        <Users />
                                    </Route>
                                    <Route path="/checkout">
                                        <Checkout />
                                    </Route>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default withRouter(App)
