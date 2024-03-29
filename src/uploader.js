import React from "react";
import axios from "./axios";

export class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(res => {
                this.props.setImage(res.data.imageurl);
            })
            .catch(function(err) {
                console.log("err in post /upload: ", err);
            });
    }
    handleChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    render() {
        return (
            <React.Fragment>
                <div className="modal-appear">
                    <h3>want to change your profile picture?</h3>
                    <input
                        className="inputfile"
                        onChange={this.handleChange}
                        name="file"
                        type="file"
                        accept="image/*"
                    />
                    <button onClick={this.handleClick}>submit</button>
                </div>
            </React.Fragment>
        );
    }
}
