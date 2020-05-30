import React, { Fragment, useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import NavbarComponent from "../Components/Navbar"
import "./App.css"
import Header from "./Header"
import Users from "../Components/Login/Users"
import ProductList from "../Components/Products/Public/ProductList"
import ProductDetails from "../Components/Products/Public/ProductDetails"
import AddEditProduct from "../Components/Products/Admin/AddEditProduct"
// import AddEditCategory from "../Components/AddEditCategory"
import Checkout from "../Components/Checkout/Checkout"
import { Switch, Route, withRouter } from "react-router-dom"
import Cookie from "js-cookie"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const token = Cookie.get("token") ? Cookie.get("token") : null

const App = (props) => {
    // loadUser() {
    //     const config = {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             Authorization: "Bearer " + token,
    //         },
    //     }
    //     let status = 0
    //     axios
    //         .get("http://localhost:8080/hello", config)
    //         .then((res) => {
    //             console.log(res)
    //             status = res.status
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //             status = error.response ? error.response.status : 0
    //         })
    //         .finally(() => {
    //             console.log(status)
    //             switch (status) {
    //                 case 200:
    //                     this.setState({ admin: true })
    //                     console.log("success!")
    //                     break
    //                 case 401:
    //                     console.log("not logged in!")
    //                     break
    //                 default:
    //                     console.log("server error")
    //             }
    //         })
    // }
    const cartSize = 2

    const [cart, setCart] = useState(
            JSON.parse(localStorage.getItem("shopCart"))
            || {}
    )

    useEffect(() => {
        localStorage.setItem("shopCart", JSON.stringify(cart))
    }, [cart])

    const addProductToCart = (ID) => {
        console.log(cart)
        let tempCart = cart
        tempCart[ID] === undefined ? (tempCart[ID] = 1) : (tempCart[ID] += 1)
        setCart(tempCart)
    }

    // console.log(JSON.parse(localStorage.getItem('shopCart')))

    return (
        <Fragment>
            <Container>
                <Row>
                    <Header />
                </Row>
                <Row>
                    <NavbarComponent cartSize={cartSize} />
                </Row>
                <Row>
                    <TransitionGroup>
                        <CSSTransition classNames="fade" timeout={300}>
                            <Switch>
                                <Route exact path="/">
                                    <ProductList
                                        addProductToCart={addProductToCart}
                                    />
                                </Route>
                                <Route exact path="/products">
                                    <AddEditProduct />
                                </Route>
                                <Route path="/products/:id">
                                    <ProductDetails
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

export default withRouter(App)
