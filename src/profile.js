// 1. make sure that this is on screen (it's child of an App)
// 2. Make sure bio editor works

// import React from "react";
//
// // you use state when you want to change things and update them later, then you use class
// // you want to add BIO column text with 500 limits
// //change you wuery to get bio out of your users table.app will get all that
//
// export default function Profile({ first, last, bio, image, id, setBio }) {
//     return (
//         <div id="profile">
//             <h1>
//                 {first} {last}
//             </h1>
//             <ProfilePic firs={first} url={image} last={last} size="xl" />
//             <BioEditor bio={bio} setBio={setBio} />
//         </div>
//     );
// }

//bioeditor need two things bio editor and function that changes the biostate.
//either its in edditing mode or in display mode

//profilepic and Bioeditor they both comes from app

// profile need to bigger that the one which is on screen

// when profile pic is in profile comething it can be twice bigger.
// or you passing a prop how big sit shoud be

// porfilepic = avatar

// function ProfilePic({id, size, url}) {
//     if (!id) {
//         return null;
//     }
// }
//example how you could use an id
