import React, { Component } from "react"
import { Container, Row, Table } from "react-bootstrap"
import axios from "axios"
import Cookie from "js-cookie"

const token = Cookie.get("token") ? Cookie.get("token") : null
const config = {
    headers: {
        Authorization: "Bearer " + token,
    },
}

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        let status = 0
        let users = []
        axios
            .get("http://localhost:8080/admin/users", config)
            .then((res) => {
                users = res.data
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
                        console.log(users)
                        this.setState({ users: users })
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

    render() {
        return (
            <Container>
                <Row>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Role</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Created</th>
                                <th>Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => {
                                return (
                                    <tr key={user.ID}>
                                        <td>{user.ID}</td>
                                        <td>
                                            {user.status === 1 ? "admin" : "user"}
                                        </td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.CreatedAt}</td>
                                        <td>{user.UpdatedAt}</td>
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

export default Users
