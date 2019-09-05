import React from "react";
import Profilepicture from "./profilepicture";
import { Uploader } from "./uploader";
import axios from "./axios";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Peter",
            last: "Anderson",
            imageurl: "https://picsum.photos/200/300?grayscale",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        console.log("App mounted!");
        axios
            .post("/user", this.state)
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
        // we will want to make an axios request to server
        // it will do a db query to find out info about user.
        // in req.session.userId when we have info we can add to state
        // setState.
    }
    //toggleModal()
    //if is.State is visible is true then set it to the false
    // if it is falste then set it to the true
    showModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    render() {
        return (
            <React.Fragment>
                <h1 onClick={this.showModal}>Hello from App</h1>
                <Profilepicture
                    first={this.state.first}
                    last={this.state.last}
                    imageurl={this.state.imageurl}
                    showModal={this.showModal}
                />
                {this.state.uploaderIsVisible && <Uploader />}
            </React.Fragment>
        );
    }
}

// </React.Fragment> it doesnt make new element, but its like exchanging <div>s.

// {this.state.uploaderIsVisible && <Uploader />}
// conditional renderind
