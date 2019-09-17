import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { App } from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
import { init } from "./socket";
//go find Welcome that is in the same directory as start.js
const store = createStore(reducer, applyMiddleware(reduxPromise));

let elem;
if (location.pathname === "/welcome") {
    elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );

    // if user is on /welcome route, that means user is NOT logged in
    // and we should render the Registration component.
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    // elem = <img src="/circle.gif" alt="Welcome" id="circle-logo" />;
    // if else runs, that means user is logged in. For now we will just render an img
}
// elem = location.pathname == '/welcome' ? <Hello /> : <p>asdasd</p>

ReactDOM.render(elem, document.querySelector("main"));
//this render function can be called once per app
