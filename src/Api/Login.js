import axios from "axios"
import Cookie from "js-cookie"

// const token =  Cookie.get("token") ? Cookie.get("token") : null;

//to set a cookie
const signIn = (email, password) => {
    return axios
        .post("http://localhost:8080/login", {
            email: email,
            password: password,
        })
        .then((res) => {
            Cookie.set("token", res.data.token)
            return res.status
        })
        .catch(function (error) {
            console.log(error)
            return error.response.status
        })
}

export default signIn
