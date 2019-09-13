import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [buttonState, setButtonState] = useState("addFriend");

    useEffect(() => {
        axios
            .get("/user/" + props.id + "/friendship")
            .then(res => {
                console.log("response from users", res);
                let type = res.data.friendship;
                setButtonState(type);
            })
            .catch(err => {
                console.log("ERROR :", err);
            });
    }, []);
    return (
        <div>
            <button>{buttonState}</button>
        </div>
    );
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
