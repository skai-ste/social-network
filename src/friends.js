import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.friends && state.friends.filter(item => item.accepted == true)
    );
    const waiting = useSelector(
        state =>
            state.friends &&
            state.friends.filter(item => item.accepted == false)
    );

    useEffect(() => {
        console.log("showing Friends");
        dispatch(receiveFriends());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <div id="friends-list">
            <div>
                <h1>Friends</h1>
                {friends.map(user => (
                    <div key={user.id}>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <img className="users-pic" src={user.imageurl} />
                        <button onClick={() => dispatch(unfriend(user.id))}>
                            Unfriend
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h1>Waiting</h1>
                {waiting.map(user => (
                    <div key={user.id}>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <img className="users-pic" src={user.imageurl} />
                        <button
                            onClick={() =>
                                dispatch(acceptFriendRequest(user.id))
                            }
                        >
                            Accept
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
