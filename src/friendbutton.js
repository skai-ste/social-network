import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [buttonState, setButtonState] = useState("addFriend");

    useEffect(() => {
        axios
            .get("/user/" + props.id + "/friendship")
            .then(res => {
                let type = res.data.friendship;
                setButtonState(type);
            })
            .catch(err => {
                console.log("ERROR :", err);
            });
    }, []);
    const changeFriendship = () => {
        axios.post("/user/" + props.id + "/friendship").then(res => {
            let type = res.data.friendship;
            setButtonState(type);
        });
    };
    let buttonTitle;
    if (buttonState == "addFriend") {
        buttonTitle = "Add friend";
    } else if (buttonState == "endFrienship") {
        buttonTitle = "End friendship";
    } else if (buttonState == "cancelFrienship") {
        buttonTitle = "Cancel";
    } else {
        buttonTitle = "Accept";
    }
    return (
        <div className="friend-button">
            <button onClick={changeFriendship}>{buttonTitle}</button>
        </div>
    );
}
