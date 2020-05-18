import React, { Component } from "react"
import {
    Container,
    Row,
    Table,
} from "react-bootstrap"
import AddProduct from './AddProduct'
import apiQueries from "../../Api/Factory"

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
            product: this.props.product || emptyProduct,
            images: [],
            show: false,
        }
        this.changeValue = this.changeValue.bind(this)
        this.onAddFile = this.onAddFile.bind(this)
        this.newProduct = this.newProduct.bind(this)
        this.editProduct = this.editProduct.bind(this)
        this.addImages = this.addImages.bind(this)
    }

    componentDidMount() {}

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
        await this.addImages()
        await apiQueries.addProduct(this.state.product)
    }

    async editProduct(e) {
        e.preventDefault()
        await this.addImages()
        await apiQueries.editProduct(this.state.product)
        // await apiQueries.addImages()
    }

    async addImages() {
        let product = this.state.product
        await this.state.images.map(async (img) => {
            let fileName = await apiQueries.addFile(img)
            await product.images.push({
                name: fileName,
            })
        })
        return await this.setState({
            product: product,
        })
    }

    onAddFile(event) {
        let images = this.state.images
        const formData = new FormData()
        formData.append(
            "file",
            event.target.files[0],
            event.target.files[0].name,
            event.target.files[0].type
        )
        images.push(formData)
        this.setState({ images: images })
    }

    // categoryName = () => {
    //     let name = this.props.categories.find((cat) => {
    //         return cat.ID === this.state.product.category
    //     })
    //     return name
    // }
    render() {
        return (
            <Container style={{ backgroundColor: "white" }}>
                <AddProduct
                    product={this.state.product}
                    onAddFile={this.onAddFile}
                    editProduct={this.editProduct}
                    newProduct={this.newProduct}
                    changeValue={this.changeValue}
                />
                <Row>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Short Description</th>
                                <th>Description</th>
                                <th>Created</th>
                                <th>Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.products.map((product) => {
                                return (
                                    <tr key={product.ID}>
                                        <td>{product.ID}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.shortDescription}</td>
                                        <td>{product.description}</td>
                                        <td>{product.CreatedAt}</td>
                                        <td>{product.UpdatedAt}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        )
    }
}

export default AddEditProduct