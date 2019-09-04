import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        // console.log('handleChange running!');
        // console.log("e.target.value: ", e.target.value); //e.target gives back whatever user is typing
        console.log("e.target.name: ", e.target.name); //any input name is added as a property of e.target, thats wey we love putting names on e.targets
        // we use this.setState to PUT information in state! //state its like data object
        this.setState(
            {
                [e.target.name]: e.target.value //this is NOT an array -> [e.target.name] <- this is a variable right now
            },
            () => console.log("this.state: ", this.state)
        );
    } //this function will work for as much input fields as we want
    register() {
        axios
            .post("/register", this.state)
            .then(res => {
                console.log("res: ", res);
                //res.data.succes :true

                // if its true I am Redirect to main page "/"
                // if (data.data.succes OR res.data.succes) {
                //     location.replace("/");
                // } else {
                //     this.setState({ error: true });
                // }
            })
            .catch(err => {
                console.log("ERROR", err);
                this.setState({ error: true });
            });
    }
    // axios makes request to backend
    render() {
        return (
            <div>
                <h1>join our community</h1>
                {this.state.error && <h1>WROOONG !!!!!!</h1>}
                <form>
                    <input
                        name="first"
                        placeholder="first name"
                        onChange={this.handleChange}
                    />{" "}
                    <input
                        name="last"
                        placeholder="last name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="email"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="pasword"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.register}>submit</button>
                </form>
            </div>
        );
    }
}

// <button>submit</button>
//on submit call register function and pass this.state as a parameter
