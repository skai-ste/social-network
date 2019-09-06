import React from "react";
import Profilepicture from "./profilepicture";
import { Uploader } from "./uploader";
import axios from "./axios";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageurl: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    componentDidMount() {
        console.log("App mounted!");
        axios
            .get("/user")
            .then(res => {
                console.log("RES: ", res);
                this.setState({
                    first: res.data.firstname,
                    last: res.data.lastname,
                    imageurl: res.data.imageurl
                });
            })
            .catch(err => {
                console.log("ERROR", err);
                this.setState({ error: true });
            });
        // we will want to make an axios request to server
        // it will do a db query to find out info about user.
        // in req.session.userId when we have info we can add to state
        // setState.

        //every time I want to ADD DATA TO STATE I have to use setState!
    }
    //toggleModal()
    //if is.State is visible is true then set it to the false
    // if it is falste then set it to the true
    showModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(url) {
        this.setState({
            imageurl: url,
            uploaderIsVisible: false
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
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </React.Fragment>
        );
    }
}

// </React.Fragment> it doesnt make new element, but its like exchanging <div>s.

// {this.state.uploaderIsVisible && <Uploader />}
// conditional renderind

// <Profile
//     url={this.state.url}
//     first={this.state.first}
//     last={this.state.last}
//     showUploader={() => this.setState({uploaderVisible: true})}
//     bio={this.state.bio}
//     setBio={bio => {}}
// // first name, last name, photo, their bio
// // it two new component, it's profile component they first name last name, and bio component, its shows users bio and allows to edit it, in app we will render just profile and profile will render two component.
// // cheldren of profile: profilepic and bioeditor
// />
// // <Route component=Profile />
