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
        <div className="friends-list">
            <div>
                <h2>your friends:</h2>
                {friends.map(user => (
                    <div className="friend-place" key={user.id}>
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
                <h2>people who would like to be friends:</h2>
                {waiting.map(user => (
                    <div className="friend-place" key={user.id}>
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
