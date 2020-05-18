import axios from "axios"

const apiQueries = {
    getProducts: getProducts,
    addProduct: addProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    getCategories: getCategories,
    addCategory: addCategory,
    editCategory: editCategory,
    deleteCategory: deleteCategory,
    addImages: addImages,
    addFile: addFile,
}
export default apiQueries;

const headers = {
    "Access-Control-Allow-Origin": "*",
}

const formHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
}

function handleError(error) {
    // handle error
    console.log(error);
    return null;
}

function handleResponse(res) {
    // console.log(res.data)
    return res.data;
}

function beforeRequest(request, item = null) {
    console.log(request);
    console.log(item);
}

function getProducts() {
    return axios
        .get("http://localhost:8080/products")
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function addProduct(product) {
    beforeRequest(product)
    return axios
        .post("http://localhost:8080/product", product, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function editProduct(product) {
    console.log("#############################")
    console.log(product)
    return axios
        .put("http://localhost:8080/product", product, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function deleteProduct(product) {
    console.log(product)
    return axios
        .delete("http://localhost:8080/product", product, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function getCategories() {
    return axios
        .get("http://localhost:8080/categories")
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function addCategory(category) {
    console.log(category)
    return axios
        .post("http://localhost:8080/category", category, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function editCategory(category) {
    console.log(category)
    return axios
        .put("http://localhost:8080/category", category, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function deleteCategory(category) {
    console.log(category)
    return axios
        .delete("http://localhost:8080/category", category, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function addImages(category) {
    console.log(category)
    return axios
        .post("http://localhost:8080/category", category, headers)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}

function addFile(file) {
    return axios
        .post("http://localhost:8080/image", file, formHeaders)
        .then((res) => handleResponse(res))
        .catch((e) => handleError(e));
}