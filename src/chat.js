import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.messages);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };
    const elemRef = useRef();
    useEffect(
        () => {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [chatMessages]
    );
    return (
        <div className="chat">
            <h2>chat chat chat ::</h2>
            <div className="chat-messages" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(message => (
                        <div className="chat-content" key={message.id}>
                            <img className="users-pic" src={message.imageurl} />
                            <h3>
                                {message.firstname} {message.lastname}{" "}
                                {message.posted_date}
                            </h3>
                            <p> {message.message} </p>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
