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
        this.setState(
            {
                [e.target.name]: e.target.value //this is NOT an array -> [e.target.name] <- this is a variable right now
            },
            () => console.log("this.state: ", this.state)
        );
    } //this function will work for as much input fields as we want
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
    // axios makes request to backend
    render() {
        return (
            <div id="register-container">
                <h1>join us:</h1>
                {this.state.error && <h1>WROOONG !!!!!!</h1>}
                <form id="register-inputs">
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        autoComplete="off"
                        required
                        onChange={this.handleChange}
                    />{" "}
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
                <Link id="log-in" to="/login">
                    Log in
                </Link>
            </div>
        );
    }
}
