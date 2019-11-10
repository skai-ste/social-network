import React from "react";
import Bioeditor from "./bioeditor";
import ProfilePicture from "./profilepicture";

export default function Profile({ first, last, bio, imageurl, setBio }) {
    return (
        <div className="profile">
            <h1 id="profile-names">
                {first} {last}
            </h1>
            <ProfilePicture
                first={first}
                imageurl={imageurl}
                last={last}
                size="xl"
            />
            <Bioeditor bio={bio} setBio={setBio} />
        </div>
    );
}
