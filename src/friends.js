import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);

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
                {friends.map(user => (
                    <div key={user.id}>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                        <img className="users-pic" src={user.imageurl} />
                    </div>
                ))}
            </div>
        </div>
    );
}
