import React from "react";

export default function Profilepicture({ imageurl, first, last, showModal }) {
    console.log("imageurl: ", imageurl);
    const altTag = `user Imgage of ${first} ${last}`;
    imageurl = imageurl || "/default.png";
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
            />
        </div>
    );
}

// export default function Profilepicture(props) {
//     console.log("imageurl: ", props.imageurl);
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
