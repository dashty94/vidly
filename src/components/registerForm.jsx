import Form from "./common/form"
import Joi from "joi-browser"
import React from "react"

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {},
    }

    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name"),
    }

    doSubmit = () => {
        //
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        )
    }
}

export default RegisterForm
