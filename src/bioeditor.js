import React from "react";
import axios from "./axios";

// CLASS
//
export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio,
            bioEditorIsVisible: props.bioEditorIsVisible
        };
        this.handleChange = this.handleChange.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showBio = this.showBio.bind(this);
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state: ", this.state)
        );
    }
    setBio() {
        axios
            .post("/bio", this.state)
            .then(res => {
                console.log("RESRESRES: ", res);
                this.props.setBio(res.data.bio);
                this.setState({
                    bioEditorIsVisible: false
                });
            })
            .catch(err => {
                console.log("ERROR", err);
                this.setState({ error: true });
            });
    }
    showBio() {
        this.setState({
            bioEditorIsVisible: true
        });
    }
    render() {
        let component;
        if (this.state.bioEditorIsVisible) {
            component = (
                <div>
                    <textarea
                        onChange={this.handleChange}
                        id="bio-area"
                        name="bio"
                        rows="8"
                        cols="53"
                        value={this.state.bio}
                    />
                    <button onClick={this.setBio}>save</button>
                </div>
            );
        } else {
            const hasBio =
                this.state.bio.length != null && this.state.bio.length > 0;
            let buttonTitle;

            if (hasBio) {
                buttonTitle = "edit";
            } else {
                buttonTitle = "add your BIO";
            }
            component = (
                <div>
                    <h3>{this.state.bio}</h3>
                    <a href="#" onClick={this.showBio}>
                        {buttonTitle}
                    </a>
                </div>
            );
        }
        // one state when you view the bio, another state when you edit bio.

        return <React.Fragment>{component}</React.Fragment>;
    }
}
