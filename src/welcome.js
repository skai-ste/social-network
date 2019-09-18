import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <HashRouter>
            <body id="welcome-body">
                <div id="welcome-container">
                    <div id="welcome-template">
                        <p id="white-word">GIVE</p>
                        <p id="white-word">SOMETHING</p>
                        <p id="back-word">BACK</p>
                        <p id="white-word">KK</p>
                    </div>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </body>
        </HashRouter>
    );
}

// <a href="/logout">log out</a>

// <HashRouter>
//     <div>
//      //here you can put just one child.
//     </div>
// </HashRouter>

// <Route path="*" component={Registration} />
// no matter url is use this Registration route

// <Redirect path="*" to "/" />

// <div>
//     <p>This is welcome template</p>
//     <img src="/welcome.jpg" alt="Welcome" />
//     <HashRouter>
//         <div>
//             <Route path="/" component={Registration} />
//             <Route path="/login" component={Login} />
//         </div>
//     </HashRouter>
// </div>

// <Link to="/login">Log in</Link>
// <a href="#/login">

// <Route path="/" component={LoginLink} />
// // <-inside HashRouter
// //and then function outside all Welcome ->
// function LoginLink() {
//     return <Link to="/login">log in</Link>
// }
