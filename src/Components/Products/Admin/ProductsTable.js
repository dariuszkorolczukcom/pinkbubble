import React, { Fragment } from "react"
import { Table } from "react-bootstrap"
import AddProduct from "./AddProduct"


const ProductsTable = (props) => {
    let fetching = props.fetching
    let products = props.products
    let onAddFile = props.onAddFile
    let editProduct = props.editProduct
    let changeEditValue = props.changeEditValue
    return(
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
                            {!fetching &&
                                products.map((product, i) => {
                                    return (
                                        <Fragment key={product.ID}>
                                            <tr>
                                                <td>{product.ID}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    {product.shortDescription}
                                                </td>
                                                <td>{product.description}</td>
                                                <td>{product.CreatedAt}</td>
                                                <td>{product.UpdatedAt}</td>
                                            </tr>
                                            <AddProduct
                                                product={product}
                                                newProduct={(e) =>
                                                    editProduct(e, i)
                                                }
                                                onAddFile={onAddFile}
                                                changeValue={(e) =>
                                                    changeEditValue(e, i)
                                                }
                                            />
                                        </Fragment>
                                    )
                                })}
                        </tbody>
                    </Table>
    )
}

export default ProductsTable
