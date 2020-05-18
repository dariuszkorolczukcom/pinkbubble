import React, { Component } from "react"
import { Container, Row, Spinner } from "react-bootstrap"
import apiQueries from "../Api/Factory"
import NavbarComponent from "../Components/Navbar"
import "./App.css"
import Header from "./Header"
import Users from "../Components/Users"
import ProductList from "../Components/Products/ProductList"
import AddEditProduct from "../Components/Products/AddEditProduct"
// import AddEditCategory from "../Components/AddEditCategory"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            fetching: true,
            cart: {},
        }
        this.addProduct = this.addProduct.bind(this)
    }

    componentDidMount() {
        this.load()
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

    addProduct(ID) {
        let cart = this.state.cart
        cart[ID] === undefined ? (cart[ID] = 1) : (cart[ID] += 1)
        this.setState(
            {
                cart: cart,
            },
            console.log(this.state.cart)
        )
    }

    render() {
        return (
            <Router>
                <video autoPlay muted loop id="Video">
                    <source src="BubblesLoop.mp4" type="video/mp4" />
                </video>
                <Container>
                    <Row>
                        <Header />
                    </Row>
                    <Row>
                        <NavbarComponent render={!this.state.fetching} />
                    </Row>
                    <Row>
                        <Switch>
                            <Route exact path="/">
                                {this.state.fetching && (
                                    <Spinner animation="grow" />
                                )}
                                {!this.state.fetching && (
                                    <ProductList
                                        products={this.state.products}
                                        addProduct={this.addProduct}
                                    />
                                )}
                            </Route>
                        </Switch>
                        <Route path="/products">
                            <AddEditProduct products={this.state.products} />
                        </Route>
                        {/* <Route path="/categories">
                            <AddEditCategory />
                        </Route> */}
                        <Route path="/users">
                            <Users />
                        </Route>
                    </Row>
                </Container>
            </Router>
        )
    }
}

export default App
