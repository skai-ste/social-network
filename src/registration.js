import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    register(event) {
        event.preventDefault();
        axios
            .post("/register", this.state)
            .then(res => {
                if (res.data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(err => {
                console.log("ERROR", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <div id="register-container">
                <h1>register ::</h1>
                {this.state.error && <h3>something went wrong ! ! !</h3>}
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                    />
                    <button onClick={this.register}>register</button>
                </form>
                <p>
                    Already a member?{" "}
                    <Link id="log-in" to="/login">
                        Log in
                    </Link>
                </p>
            </div>
        );
    }
}
