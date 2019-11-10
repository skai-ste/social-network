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
