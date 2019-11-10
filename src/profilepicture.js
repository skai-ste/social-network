import React from "react";

export default function Profilepicture({
    imageurl,
    first,
    size,
    last,
    showModal
}) {
    const altTag = `user Imgage of ${first} ${last}`;
    imageurl = imageurl || "/default.png";
    size = size || "normal";
    return (
        <div>
            <img
                onClick={showModal}
                src={imageurl}
                alt={altTag}
                id="profile-image"
                className={size}
            />
        </div>
    );
}
