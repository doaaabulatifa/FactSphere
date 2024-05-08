# FactSphere


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    link TEXT,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS likes (
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    PRIMARY KEY (user_id, post_id)
);
INSERT INTO categories(category_name) VALUES('Science'),('Children'),('Nature'),('Countries'),('Traveling'),('Food'),('Health');
SELECT posts.title, posts.content, categories.category_name AS category
FROM posts
JOIN categories ON posts.category_id = categories.id;
SELECT posts.title, posts.content, categories.category_name AS category
FROM posts
JOIN categories ON posts.category_id = categories.id
WHERE categories.category_name = 'Technology';
-- Reset the auto-incremented ID value to start from 6
ALTER SEQUENCE users_id_seq RESTART WITH 7;
SELECT
    users.username,
    users.email,
    posts.title,
    posts.content,
    posts.link,
    categories.category_name
FROM
    users
JOIN
    posts ON users.id = posts.user_id
JOIN
    categories ON posts.category_id = categories.id;

    SELECT posts.title, posts.content,posts.link , categories.category_name AS category
FROM posts
JOIN categories ON posts.category_id = categories.id
WHERE categories.id = 1;
