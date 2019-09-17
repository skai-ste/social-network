import * as io from "socket.io-client";
// import { chatMessages, chatMessage } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("message from server", msg => {
            console.log(`
                Got message from the front end about to start redux stuff by dispaching an action! My message: ${msg}
                `);
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
