export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        // state = Object.assign({}, state, {
        //     users: action.users
        // });
        state = {
            ...state,
            friends: action.friends
        };
    }
    console.log("reducer.state", state);
    return state;
}
