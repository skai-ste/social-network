import React from "react";
import axios from "./axios";
import Profile from "./profile";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imageurl: "",
            bio: ""
        };
    }
    componentDidMount() {
        console.log("App mounted!");
        axios
            .get("/user/" + this.props.match.params.id + "/info")
            .then(res => {
                if (res.data.check) {
                    this.props.history.push("/");
                } else {
                    console.log("RESSSSSS: ", res);
                    this.setState({
                        first: res.data.firstname,
                        last: res.data.lastname,
                        imageurl: res.data.imageurl,
                        bio: res.data.bio
                    });
                }
            })
            .catch(err => {
                console.log("ERROR", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <React.Fragment>
                <Profile
                    id={this.state.id}
                    first={this.state.first}
                    last={this.state.last}
                    imageurl={this.state.imageurl}
                    bio={this.state.bio}
                />
            </React.Fragment>
        );
    }
}
