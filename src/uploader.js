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
        console.log("this: ", this);

        var formData = new FormData();
        formData.append("file", this.state.file);
        //you have to use method and loop through it to see what is inside
        axios
            .post("/upload", formData)
            .then(res => {
                this.props.setImage(res.data.imageurl);
                console.log("res.data: ", res.data);
            })
            .catch(function(err) {
                console.log("err in post /upload: ", err);
            });
    }
    handleChange(e) {
        // console.log("file: ", e.target.files[0]);
        this.setState({ file: e.target.files[0] }, () =>
            console.log("handleChange")
        );
    }
    render() {
        return (
            <React.Fragment>
                <h3>Want to change your picture?</h3>
                <input
                    className="inputfile"
                    onChange={this.handleChange}
                    name="file"
                    type="file"
                    accept="image/*"
                />
                <button onClick={this.handleClick}>submit</button>
            </React.Fragment>
        );
        // you have to put the form for uploading
        // i am passing this.props.handlechange.
        // this is how you pass it from the app
        // this.handle click for button
    }
}

// all FormData will be in handleclick
// handle click  will make post request to the server and the server to data base
// hancle change will grab a file

// those two methods will be here
