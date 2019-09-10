const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbuser, dbpass } = require("../secrets.json");
    db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/socialnetwork`);
}

exports.addUserData = function(firstname, lastname, email, password) {
    return db
        .query(
            `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [firstname, lastname, email, password]
        )
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.getPassword = function(email) {
    return db
        .query(`SELECT password, id FROM users WHERE email = $1`, [email])
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.getUserData = function(id) {
    return db
        .query(`SELECT * FROM users where id = $1`, [id])
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.addUserImageData = function(id, imageurl) {
    return db
        .query(`UPDATE users SET imageurl = $2 WHERE id = $1 RETURNING *`, [
            id,
            imageurl
        ])
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.setUserBio = function(id, bio) {
    return db
        .query(`UPDATE users SET bio = $2 WHERE id = $1 RETURNING *`, [id, bio])
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.getUsers = function() {
    return db
        .query(
            `SELECT id, imageurl, firstname, lastname FROM users ORDER BY id DESC
        LIMIT 3`
        )
        .then(({ rows }) => {
            return rows;
        });
};
