import React from "react";
import ProfilePicture from "./profilepicture";
import { Uploader } from "./uploader";
import { Chat } from "./chat";
import axios from "./axios";
import Profile from "./profile";
import { OtherProfile } from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./findpeople";
import Friends from "./friends";
import { Link } from "react-router-dom";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageurl: "",
            bio: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
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
                    imageurl: res.data.imageurl,
                    bio: res.data.bio
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
    // toggleModal()
    // if is.State is visible is true then set it to the false
    // if it is falste then set it to the true
    showModal() {
        let visible = !this.state.uploaderIsVisible;
        this.setState({
            uploaderIsVisible: visible
        });
    }
    setImage(url) {
        this.setState({
            imageurl: url,
            uploaderIsVisible: false
        });
    }
    setBio(bio) {
        this.setState({
            bio: bio,
            bioEditorIsVisible: false
        });
    }
    showUploader() {
        this.setState({});
    }
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="header">
                        <div>
                            <ProfilePicture
                                first={this.state.first}
                                last={this.state.last}
                                imageurl={this.state.imageurl}
                                showModal={this.showModal}
                            />
                            {this.state.uploaderIsVisible && (
                                <Uploader setImage={this.setImage} />
                            )}
                            <p id="logo-kk">KK KK KKKK KK</p>
                        </div>

                        <div id="header-links">
                            <Link to="/">PROFILE </Link>{" "}
                            <Link to="/findpeople">FIND PEOPLE </Link>
                            <Link to="/friends">FRIENDS </Link>
                            <Link to="/chat">CHAT </Link>
                        </div>
                    </div>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageurl={this.state.imageurl}
                                    onClick={this.showUploader}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/findpeople" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

// </React.Fragment> it doesnt make new element, but its like exchanging <div>s.

// {this.state.uploaderIsVisible && <Uploader />}
// conditional renderind
//
// <Profile
//     url={this.state.url}
//     first={this.state.first}
//     last={this.state.last}
//     showUploader={() => this.setState({uploaderVisible: true})}
//     bio={this.state.bio}
//     setBio={bio => {}}
// first name, last name, photo, their bio
//
// its two new component, it's profile component they first name last name, and bio component, its shows users bio and allows to edit it, in app we will render just profile and profile will render two component.
// // children of profile: profilepic and bioeditor
// />
// // <Route component=Profile />
