import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [buttonState, setButtonState] = useState("addFriend");

    useEffect(() => {
        axios
            .get("/user/" + this.props.match.params.id + "/friendship")
            .then(res => {
                console.log("response from users", res);
                let type = res.friendship;
                setButtonState(type);
            })
            .catch(err => {
                console.log("ERROR :", err);
            });
    }, []);
}
// if (type == "addFriend") {} else if (type == "blaba") {}

// this.setState({
//    buttonState: type
// })
// setButtonState(type);

//addFriend
//waiting for reply
//acceptFriend
//we are friends and we can remove friendship
