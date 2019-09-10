import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("/users")
            .then(res => {
                console.log("response from users", res);
                setUsers(res.data);
            })
            .catch(err => {
                console.log("ERROR :", err);
            });
    }, []);
    return (
        <div>
            <h2>Latest 3 users to join:</h2>
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
            <h2>Search for users:</h2>
            <form>
                <input
                    id="search-input"
                    type="text"
                    name="text"
                    placeholder="search"
                    autoComplete="off"
                />
            </form>
        </div>
    );
}

//you want to map over an array of getUsers
//input field
