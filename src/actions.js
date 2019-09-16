import axios from "axios";

export async function receiveFriends() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("recieved friends", data);
    return {
        type: "RECEIVE_FRIENDS",
        friends: data.friends
    };
}
