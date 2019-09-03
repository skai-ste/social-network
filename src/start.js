//////1///////
// import React from "react";
// import ReactDOM from "react-dom";
//
// import Hello from ".hello"; //go find hello that is in the same directory as start.js
//
// ReactDOM.render(<HelloWorld />, document.querySelector("main")); //this render function can be called once per app
//
// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

////2////
import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;

    // if user is on /welcome route, that means user is NOT logged in
    // and we should render the Registration component.
} else {
    elem = <p>my looogoooo</p>;
    // if else runs, that means user is logged in. For now we will just render an img
}
// elem = location.pathname == '/welcome' ? <Hello /> : <p>asdasd</p>

ReactDOM.render(elem, document.querySelector("main"));
