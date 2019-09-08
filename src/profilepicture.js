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
            <h2>
                I am the profilepicture component. My name is: {first} {last}
            </h2>
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

// export default function Profilepicture(props) {
//     let imageurl = props.imageurl || "/img/default.png";
//     return (
//         <div>
//             <h2>
//                 I am the profilepicture component. My name is: {props.first}
//                 {props.last}
//             </h2>
//             <img onClick={props.showModal} src={imageurl} />
//         </div>
//     );
// }
