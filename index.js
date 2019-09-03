const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());

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

/// in this file it will just 2 routes ///

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//// this route needs to be last! /////

app.listen(8080, function() {
    console.log("I'm listening.");
});
