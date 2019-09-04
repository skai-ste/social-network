const express = require("express");
const app = express();
const compression = require("compression");
const { hash, compare } = require("./utils/bc");
// const { hasUserId, hasNoUserId } = require("./middleware");
const { addUserData, getPassword } = require("./utils/db");
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
    res.cookie("mytoken", req.csrfToken());
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
app.post("/register", (req, res) => {
    console.log("req.body", req.body); //make sure properties are called first name last name
    console.log("req.body.password", req.body.password);
    hash(req.body.password)
        .then(hashedPsw => {
            console.log("hashedPsw: ", hashedPsw);
            return addUserData(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPsw
            );
        })
        .then(result => {
            console.log("RESULT:", result);
            req.session.userId = result.rows[0].id;
            console.log("result.rows[0].id :", result.rows[0].id);
            res.json({ success: true });
            //res.data.succes :true
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    getPassword(req.body.email)
        .then(hashedPsw => {
            console.log("hashedPsw :", hashedPsw);
            return compare(req.body.password, hashedPsw.password).then(
                match => {
                    console.log("did my pasword match?");
                    console.log(match);
                    if (match) {
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                }
            );
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.render("login", {
                error: true
            });
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//// this route needs to be last! /////

app.listen(8080, function() {
    console.log("I'm listening.");
});
