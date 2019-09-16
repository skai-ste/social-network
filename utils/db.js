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

exports.getMatchingActors = function(val) {
    return db
        .query(
            `SELECT id, imageurl, firstname, lastname FROM users WHERE firstname ILIKE $1;`,
            [val + "%"]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getFriendship = function(sender_id, receiver_id) {
    return db.query(
        `SELECT * FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};
//checks relationship between users
//check if sender id is you or sender id is another person

exports.sendFriendshipRequest = function(sender_id, receiver_id) {
    return db
        .query(
            `INSERT INTO friendships (receiver_id, sender_id) VALUES ($1, $2) RETURNING *`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.acceptFriendshipRequest = function(sender_id, receiver_id) {
    return db
        .query(
            `UPDATE friendships SET accepted = TRUE WHERE (receiver_id = $1 AND sender_id = $2) RETURNING *`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.removeFriendship = function(sender_id, receiver_id) {
    return db.query(
        `DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};

exports.getFriendsList = function() {
    return db.query(
        `
            SELECT users.id, first, last, image, accepted
            FROM friendships
            JOIN users
            ON (accepted = false AND recipient_id = $1 AND requester_id = users.id)
            OR (accepted = true AND recipient_id = $1 AND requester_id = users.id)
            OR (accepted = true AND requester_id = $1 AND recipient_id = users.id)
        `
    );
};
