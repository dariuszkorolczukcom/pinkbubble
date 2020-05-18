import axios from "axios"
import Cookie from "js-cookie"

const token = Cookie.get("token") ? Cookie.get("token") : null
const config = {
    headers: {
        Authorization: "Bearer " + token,
    },
}
//to set a cookie
const getUsers = () => {
    return axios.get("http://localhost:8080/admin/users", config)
}

export default getUsers
