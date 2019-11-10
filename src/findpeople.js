import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [info, setInfo] = useState("");

    useEffect(() => {
        axios
            .get("/users")
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log("ERROR :", err);
            });
    }, []);
    useEffect(
        () => {
            axios
                .get("/users/" + info)
                .then(res => {
                    setUsers(res.data);
                })
                .catch(err => {
                    console.log("ERROR :", err);
                });
        },
        [info]
    );
    const handleChange = e => {
        setInfo(e.target.value);
    };
    return (
        <div className="find-friends">
            <h2>search for users:</h2>
            <form>
                <input
                    id="search-input"
                    type="text"
                    name="text"
                    placeholder="search"
                    autoComplete="off"
                    onChange={handleChange}
                    defaultValue={info}
                />
            </form>
            <h2>latest 3 users to join:</h2>
            <div>
                {users.map(user => (
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
