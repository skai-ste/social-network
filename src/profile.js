import React from "react";
import Bioeditor from "./bioeditor";
import ProfilePicture from "./profilepicture";

export default function Profile({ first, last, bio, imageurl, setBio }) {
    console.log("BIO", bio);

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

//
//
// you use state when you want to change things and update them later, then you use class
// change you wuery to get bio out of your users table.app will get all that
//

// profilepic and Bioeditor they both comes from app

// profile need to bigger that the one which is on screen

// when profile pic is in profile something it can be twice bigger.
// or you passing a prop how big sit shoud be

// porfilepic = avatar

// function ProfilePic({id, size, url}) {
//     if (!id) {
//         return null;
//     }
// }
//example how you could use an id
