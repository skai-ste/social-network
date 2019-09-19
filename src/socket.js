import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgs => {
            store.dispatch(chatMessages(msgs.chatMessages));
            console.log("Got all messages:", msgs);
        });

        socket.on("chatMessage", msg => {
            store.dispatch(chatMessage(msg));
            console.log("Got new message:", msg);
        });
    }
}

// export const init = store => {
//     if (!socket) {
//         socket = io.connect();
//
//         socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));
//
//         socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
//     }
// };
