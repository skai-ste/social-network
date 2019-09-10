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
            <h1>Lates 3 users to join:</h1>
        </div>
    );
}

//you want to map over an array of getUsers
//input field
