const express = require("express");
const app = express();
const compression = require("compression");
const { hash, compare } = require("./utils/bc");
const {
    addUserData,
    getPassword,
    getUserData,
    addUserImageData,
    setUserBio,
    getUsers,
    getMatchingActors,
    getFriendship
} = require("./utils/db");
var cookieSession = require("cookie-session");
const csurf = require("csurf");
const s3 = require("./s3");
const config = require("./config");

app.use(compression());

///////////// FILE UPLOAD BOILERPLATE ///////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

app.use(express.json());

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
///////////// FILE UPLOAD BOILERPLATE ///////////

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
// You should drop it to all other projects too, like petition.

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
    console.log("req.body", req.body);
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
            // console.log("RESULT:", result);
            req.session.userId = result.id;
            res.json({ success: true });
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    getPassword(req.body.email)
        .then(result => {
            var hashedPsw = result.password;
            console.log("user :", result);
            return compare(req.body.password, hashedPsw).then(match => {
                console.log("did my pasword match?", match);
                if (match) {
                    req.session.userId = result.id;
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            });
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/user", (req, res) => {
    getUserData(req.session.userId)
        .then(result => {
            // console.log("RESULT: ", result);
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/welcome", (req, res) => {
    if (!req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // req.file - the file that was just uploaded
    const { filename } = req.file;
    const url = config.s3Url + filename; //if you got here you have url of img and all other information
    console.log("URL :", url);

    addUserImageData(req.session.userId, url)
        .then(result => {
            console.log("RESULT :", result);
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.post("/bio", (req, res) => {
    const bio = req.body.bio;
    console.log("POST /bio:", req.body);
    setUserBio(req.session.userId, bio)
        .then(result => {
            console.log("RESULT :", result);
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/user/:id/info", (req, res) => {
    console.log("req.params.id", req.params.id);
    if (req.session.userId == req.params.id) {
        res.json({
            checkId: true
        });
    } else {
        getUserData(req.params.id)
            .then(result => {
                console.log("RESULT: ", result);
                res.json(result);
            })
            .catch(err => {
                console.log("ERROR :", err);
                res.json({ success: false });
            });
    }
});

app.get("/users", (req, res) => {
    getUsers()
        .then(result => {
            console.log("RESULT: ", result);
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/users/:info", (req, res) => {
    console.log("req.params", req.params);
    getMatchingActors(req.params.info)
        .then(result => {
            console.log("RESULT: ", result);
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/user/:id/friendship", (req, res) => {
    getFriendship(req.session.userId, req.params.id)
        .then(result => {
            if (result.length == 0) {
                res.json({
                    friendship: "addFriend"
                });
            } else {
                result[0];
            }
            console.log("RESULT: ", result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

//// this route needs to be last! /////
app.get("*", function(req, res) {
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});
//// this route needs to be last! /////

app.listen(8080, function() {
    console.log("I'm listening.");
});
