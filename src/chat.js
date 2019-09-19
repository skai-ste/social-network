import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.messages);
    console.log("here are my chat messages: ", chatMessages);

    const keyCheck = e => {
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted");
        console.log("elemRef:", elemRef.current);
        console.log("scroll top", elemRef.current.scrollTop);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;

        //if user types we want to keep running this user effect, so in array you will put smth from redux
    }, []);

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
