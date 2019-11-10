import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    login(event) {
        event.preventDefault();
        axios
            .post("/login", this.state)
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
            <div id="login-container">
                <h1>log in ::</h1>
                {this.state.error && <h3>something went wrong ! ! !</h3>}
                <form>
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
                    <button onClick={this.login}>log in</button>
                </form>
            </div>
        );
    }
}
