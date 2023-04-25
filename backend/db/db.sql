-- 1. create the database in PostgreSQL
CREATE DATABASE real_time_chat_app
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- 2. create the users table
CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 20),
    email VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(email) <= 50),
    password TEXT NOT NULL CHECK (LENGTH(password) >= 8),
    is_avatar_image_set BOOLEAN DEFAULT FALSE,
    avatar_image TEXT DEFAULT ''
);

-- 3. create the messages table
CREATE TABLE messages (
    id SERIAL NOT NULL PRIMARY KEY,
    message TEXT NOT NULL,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT NOT NULL REFERENCES users(id),
    send_date TIMESTAMP NOT NULL
);