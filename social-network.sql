DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
    lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    imageurl VARCHAR(599),
    bio VARCHAR(599),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS friendships CASCADE;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);

SELECT * FROM friendships
WHERE (reciever_id = $1 AND sender_id = $2)
OR (reciever_id = $2 AND sender_id = $1)
