import axios from "axios";

export async function receiveFriends() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_FRIENDS",
        friends: data.friends
    };
}
export async function acceptFriendRequest(user_id) {
    const { data } = await axios.post("/user/" + user_id + "/friendship");
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        user_id: user_id
    };
}
export async function unfriend(user_id) {
    const { data } = await axios.post("/user/" + user_id + "/friendship");
    return {
        type: "UNFRIEND",
        user_id: user_id
    };
}
export async function chatMessage(msg) {
    return {
        type: "CHAT_MESSAGE",
        message: msg
    };
}
export async function chatMessages(msgs) {
    return {
        type: "CHAT_MESSAGES",
        messages: msgs
    };
}
