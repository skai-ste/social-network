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
    getFriendship,
    sendFriendshipRequest,
    removeFriendship,
    acceptFriendshipRequest,
    getFriendsList,
    addMessage,
    getMessages
} = require("./utils/db");
var cookieSession = require("cookie-session");
const s3 = require("./s3");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

const cookieSessionMiddleWare = cookieSession({
    secret: `I'm happy.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleWare);

io.use(function(socket, next) {
    cookieSessionMiddleWare(socket.request, socket.request.res, next);
});

app.use(express.static("public"));

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
///////////////////////////////////////////////////
app.post("/register", (req, res) => {
    hash(req.body.password)
        .then(hashedPsw => {
            return addUserData(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPsw
            );
        })
        .then(result => {
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
            return compare(req.body.password, hashedPsw).then(match => {
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
    const { filename } = req.file;
    const url = config.s3Url + filename;
    addUserImageData(req.session.userId, url)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.post("/bio", (req, res) => {
    const bio = req.body.bio;
    setUserBio(req.session.userId, bio)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/user/:id/info", (req, res) => {
    if (req.session.userId == req.params.id) {
        res.json({
            checkId: true
        });
    } else {
        getUserData(req.params.id)
            .then(result => {
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
            res.json(result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/users/:info", (req, res) => {
    getMatchingActors(req.params.info)
        .then(result => {
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
            if (result.rows.length == 0) {
                res.json({
                    friendship: "addFriend"
                });
            } else {
                let friendship = result.rows[0];
                // We have some relationship
                if (friendship.accepted == true) {
                    // We are friends
                    res.json({
                        friendship: "endFrienship"
                    });
                } else {
                    // We have friendship question
                    if (friendship.sender_id == req.session.userId) {
                        // I am the sender, I can cancel if I want
                        res.json({
                            friendship: "cancelFrienship"
                        });
                    } else {
                        // I am the receiver of request, I can accept
                        res.json({
                            friendship: "acceptFriend"
                        });
                    }
                }
            }
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.post("/user/:id/friendship", (req, res) => {
    getFriendship(req.session.userId, req.params.id)
        .then(result => {
            if (result.rows.length == 0) {
                // No friendship, we are not friends (yet)
                return sendFriendshipRequest(
                    req.session.userId,
                    req.params.id
                ).then(result => {
                    // We sent the request, waiting for answer
                    res.json({
                        friendship: "cancelFrienship"
                    });
                });
            } else {
                let friendship = result.rows[0];
                // We have some relationship
                if (friendship.accepted == true) {
                    // We are friends
                    // We want to stop being friends
                    return removeFriendship(
                        req.session.userId,
                        req.params.id
                    ).then(result => {
                        // We are not friends anymore, but can become again
                        res.json({
                            friendship: "addFriend"
                        });
                    });
                } else {
                    // We have friendship question
                    if (friendship.sender_id == req.session.userId) {
                        // I am the sender, I can cancel if I want
                        return removeFriendship(
                            req.session.userId,
                            req.params.id
                        ).then(result => {
                            // We are not friends, but can become
                            res.json({
                                friendship: "addFriend"
                            });
                        });
                    } else {
                        // I am the receiver of request, I can accept
                        return acceptFriendshipRequest(
                            req.session.userId,
                            req.params.id
                        ).then(result => {
                            // We are friends, but can stop being friends
                            res.json({
                                friendship: "endFrienship"
                            });
                        });
                    }
                }
            }
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.get("/friends-wannabes/", (req, res) => {
    getFriendsList(req.session.userId)
        .then(result => {
            res.json({ friends: result });
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

server.listen(8080, function() {
    console.log("I'm listening.");
});

///////SERVER SIDE SOCKET CODE//////
io.on("connection", socket => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    getMessages()
        .then(data => {
            socket.emit("chatMessages", { chatMessages: data.reverse() });
        })
        .catch(err => {
            console.log("Get messages error", err);
            socket.disconnect(true);
        });

    let userId = socket.request.session.userId;
    socket.on("chatMessage", msg => {
        let date = new Date();
        addMessage(
            userId,
            msg,
            date.toLocaleDateString() + " " + date.toLocaleTimeString()
        ).then(message => {
            getUserData(userId)
                .then(user => {
                    let updatedMessage = message;
                    updatedMessage.firstname = user.firstname;
                    updatedMessage.lastname = user.lastname;
                    updatedMessage.imageurl = user.imageurl;
                    io.sockets.emit("chatMessage", updatedMessage);
                })
                .catch(err => {
                    console.log("Error from user:", err);
                });
        });
    });
});
