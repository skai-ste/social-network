import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [info, setInfo] = useState("");

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
    useEffect(
        () => {
            console.log(`"${info}" has been rendered!`);
            axios
                .get("/users/" + info)
                .then(res => {
                    console.log("response from users:id", res);
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

// handleChange() {
//
//     //2. acces e.target.value and that to the new state as info
//     //4. you want to update as a new state of info
// }

//you want to map over an array of getUsers
//input field

///1///
// var newFields = {};
// for (var prop in fields) {
//     newFields[prop] = fields[prop];
// }
// ///2///
// var newFields = Object.assign({}, fields);
// ///3///
// var newFields = {
//     ...fields,
//     name: "Jenny Law"
// };
//
// function Login() {
//     const [fields, setFields] = useState({});
//     const[error, setError] = useState();
//     const onChange = ({target}) => setFields({
//         ...fields,
//         [target.name]: target.value
// });
