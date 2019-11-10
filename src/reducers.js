export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    } else if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id != action.user_id) {
                    return friend;
                } else {
                    return {
                        ...friend,
                        accepted: true
                    };
                }
            })
        };
    } else if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friends: state.friends.filter(friend => friend.id != action.user_id)
        };
    } else if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            messages: action.messages
        };
    } else if (action.type == "CHAT_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.message]
        };
    }
    return state;
}
