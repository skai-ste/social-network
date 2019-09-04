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
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state: ", this.state)
        );
    }
    login(event) {
        event.preventDefault();
        axios
            .post("/login", this.state)
            .then(res => {
                console.log("RESSSSS: ", res);
                //res.data.succes :true
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
            <div>
                <h1>join our community</h1>
                {this.state.error && <h1>WROOONG !!!!!!</h1>}
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
                    <button onClick={this.login}>submit</button>
                </form>
            </div>
        );
    }
}
