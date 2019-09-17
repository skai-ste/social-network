import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("here are my last 10 chat messages: ", chatMessages);

    const keyCheck = e => {
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1>Chat Room!</h1>
            <div className="chat-messages">
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
                <p>Chat Messages will go there</p>
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
