const express = require("express");
const app = express();
const compression = require("compression");
// const { hasUserId, hasNoUserId } = require("./middleware");
// const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const { addUserData } = require("./utils/db");
var cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(compression());

app.use(express.json());

// app.use(
//     express.urlencoded({
//         extended: false
//     })
// );
///////?///////

app.use(
    cookieSession({
        secret: `I'm happy babe.`,
        maxAge: 1000 * 60 * 60 * 24 * 14 //how long you want to set the cookie
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.setHeader("X-Frame-Options", "DENY");
    res.locals.csrfToken = req.csrfToken();
    // console.log("Setting csrf to ", req.csrfToken());
    next();
});

app.use(express.static("public"));
// sompresses responses that can be somporessed, like the json files.
// You should drop it to all other projects too like petition.

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
///////////////////////////////////////////////////////////////
// app.post("/welcome", (req, res) => {
//     console.log("req.body", req.body);
//     addUserData(
//         req.body.firstname,
//         req.body.lastname,
//         req.body.email,
//         req.body.password
//     )
//         .then(result => {
//             console.log("RESULT:", result);
//             res.json(result);
//         })
//         .catch(err => {
//             console.log("ERROR :", err);
//         });
// });

/// in this file it will just 2 routes ///

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//// this route needs to be last! /////

app.listen(8080, function() {
    console.log("I'm listening.");
});
