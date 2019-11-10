import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { App } from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
import { init } from "./socket";
const store = createStore(reducer, applyMiddleware(reduxPromise));

let elem;
if (location.pathname === "/welcome") {
    elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
ReactDOM.render(elem, document.querySelector("main"));
