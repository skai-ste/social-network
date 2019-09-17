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
    getFriendsList
} = require("./utils/db");
var cookieSession = require("cookie-session");
// const csurf = require("csurf");
const s3 = require("./s3");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
// const io = require("socket.io")(server, { origins: "localhost:8080 myapp.herokuapp.com:*" });

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
const cookieSessionMiddleWare = cookieSession({
    secret: `I'm happy babe.`,
    maxAge: 1000 * 60 * 60 * 24 * 90 //how long you want to set the cookie
});

app.use(cookieSessionMiddleWare);

io.use(function(socket, next) {
    cookieSessionMiddleWare(socket.request, socket.request.res, next);
});

// app.use(csurf());

// app.use(function(req, res, next) {
//     res.cookie("mytoken", req.csrfToken());
//     next();
// });

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
            console.log("RESSSSSSULT: ", result);
            if (result.rows.length == 0) {
                // No friendship, we are not friends (yet)
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
            console.log("RESULT: ", result);
        })
        .catch(err => {
            console.log("ERROR :", err);
            res.json({ success: false });
        });
});

app.post("/user/:id/friendship", (req, res) => {
    getFriendship(req.session.userId, req.params.id)
        .then(result => {
            console.log("POST friendship: ", result.rows);
            if (result.rows.length == 0) {
                // No friendship, we are not friends (yet)
                return sendFriendshipRequest(
                    req.session.userId,
                    req.params.id
                ).then(result => {
                    // We sent the request, waiting for answer
                    console.log("send friendship: ", result);
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
                        console.log("remove friendship: ", result);
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
                            console.log("remove friendship: ", result);
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
                            console.log("accept friendship: ", result);
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
            console.log("RESULT: ", result);

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

///////////////////////////////////////

///////SERVER SIDE SOCKET CODE//////
io.on("connection", socket => {
    console.log(`a socket with the id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    let userId = socket.request.session.userId;

    socket.on("My amazing chat message", msg => {
        console.log("message received!");
        console.log("and this is the message: ", msg);
        io.sockets.emit("message from server", msg);
    });
});

// WE NEED TO DO 2 THINGS IN HERE....
// 1. We need to make a DB query ... to get the last 10 chat messages...
// db.getLastTenChatMessages().then(data => {
// here is where we EMIT those chat message....
// something like ...
// io.sockets.emit('chatMessages', data.rows)
// })

// 2. Deal with a new chat message...
// socket.on('newMessage', (msg) => {
// 1. get all the info about the user i.e. a db query.
// 2. add chat message to db.
// 3. could create a chat message object or use data from above query...
// 4. io.sockets.emit('new chat message')
// })

/////////EXAMPL/////////////

// io.sockets.sockets["kjhsudh"].emit("hiYou");

//     socket.emit("hi", {
//         msg: "hello there"
//     });
//
//     socket.emit("hi", {
//         msg: "Hello there"
//     });
//
//     socket.on("howAreYou", ({ msg }) => console.log(msg));
//
//     socket.on("disconnect", () => {
//         console.log(`A socket with the id ${socket.id} just disconected`);
//     });
// });
