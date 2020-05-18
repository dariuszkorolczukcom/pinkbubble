import React from "react"
import { Jumbotron } from "react-bootstrap"

const Header = () => {
    return (
        <div>
            <Jumbotron id="jumbotronUnit" bg="light" style={style.main}>
                <h1 className="display-3" style={style.rest}>Natural products</h1>
                <p style={style.rest} className="lead">
                    We offer a range of hand made beauty products
                </p>
                <hr style={style.rest} className="my-2" />
                <p style={style.rest}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam volutpat, turpis quis sodales imperdiet, nunc nisi
                    efficitur turpis, at efficitur mi orci id mauris. Duis a
                    mauris quis elit sodales pharetra id eget enim.
                </p>
            </Jumbotron>
        </div>
    )
}

const style={
  main:{
},
rest:{
  opacity:1,
}}

export default Header
