import React, { Component } from "react"
import { Container, Row } from "react-bootstrap"
import AddProduct from "./AddProduct"
import apiQueries from "../../../Api/Factory"
import axios from "axios"
import Cookie from "js-cookie"
import ProductsTable from "./ProductsTable"

const token = Cookie.get("token") ? Cookie.get("token") : null

const emptyProduct = {
    ID: null,
    name: "",
    shortDescription: "",
    description: "",
    category: 1,
    active: 0,
    images: [],
}
class AddEditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: emptyProduct,
            images: [],
            show: false,
            fetching: true,
            products: [],
        }
        this.changeValue = this.changeValue.bind(this)
        this.onAddFile = this.onAddFile.bind(this)
        this.newProduct = this.newProduct.bind(this)
        this.editProduct = this.editProduct.bind(this)
        this.changeEditValue = this.changeEditValue.bind(this)
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

    changeEditValue(e, i) {
        e.preventDefault()
        let products = this.state.products
        products[i][e.target.name] = e.target.value
        this.setState({
            products: products,
        })
    }

    changeValue(e) {
        e.preventDefault()
        let product = this.state.product
        product[e.target.name] = e.target.value
        this.setState({
            product: product,
        })
    }

    async newProduct(e) {
        e.preventDefault()
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + token,
            },
        }
        let product = this.state.product
        let status = 0
        product["categoryId"] = 1
        axios
            .post("http://localhost:8080/admin/product", product, config)
            .then((res) => {
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
                        this.load()
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

    async editProduct(e, i) {
        e.preventDefault()
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + token,
            },
        }
        let product = this.state.products[i]
        // product["categoryId"] = 1
        let status = 0
        axios
            .put("http://localhost:8080/admin/product", product, config)
            .then((res) => {
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
                        this.load()
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

    // async addImages() {
    //     let product = this.state.product
    //     this.state.images.map(async (img) => {
    //         let fileName = await apiQueries.addFile(img)
    //         await product.images.push({
    //             name: fileName,
    //         })
    //     })
    //     return await this.setState({
    //         product: product,
    //     })
    // }

    onAddFile(event) {
        event.preventDefault()
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + token,
            },
        }
        console.log(config)
        const formData = new FormData()
        formData.append(
            "file",
            event.target.files[0],
            event.target.files[0].name,
            event.target.files[0].type
        )
        axios
            .post("http://localhost:8080/admin/image", formData, config)
            .then((res) => {
                let product = this.state.product
                console.log(res)
                product.images.push({
                    name: res.data,
                })
                console.log(product)
                this.setState({ product: product })
            })
            .catch((e) => console.log(e))
    }

    render() {
        let fetching = this.state.fetching
        let product = this.state.product
        let products = this.state.products
        let onAddFile = this.onAddFile
        let newProduct = this.newProduct
        let editProduct = this.editProduct
        let changeValue = this.changeValue
        let changeEditValue = this.changeEditValue
        return (
            <Container style={{ backgroundColor: "white" }}>
                <AddProduct
                    product={product}
                    onAddFile={onAddFile}
                    newProduct={newProduct}
                    changeValue={changeValue}
                />
                <Row>
                    <ProductsTable 
                    fetching = {fetching}
                    products = {products}
                    onAddFile = {onAddFile}
                    editProduct = {editProduct}
                    changeEditValue = {changeEditValue}
                    />
                </Row>
            </Container>
        )
    }
}

export default AddEditProduct

