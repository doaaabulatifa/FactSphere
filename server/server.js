import cors from "cors";
import express from "express";
import pg from "pg";
import dotenv from "dotenv";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const connectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: connectionString });

app.get("/",(request,response)=>{
    response.json("you are looking at my route")
});
app.get("/posts", async (request,response)=>{
    const result = await db.query(`SELECT
    posts.id AS post_id,
    posts.title,
    posts.content,
    posts.link,
    users.id AS user_id,
    users.username,
    users.email,
    categories.id AS category_id,
    categories.category_name
FROM
    posts
JOIN
    users ON posts.user_id = users.id
JOIN
    categories ON posts.category_id = categories.id;

    
`);
    response.json(result.rows);
});
app.post("/post", async (request, response) => {
    const { title, content, link, category_id } = request.body;
    db.query(
        `INSERT INTO posts(title, content, link, category_id) VALUES($1, $2, $3, $4)`,
        [title, content, link, category_id],
    response.json({success:true}));
});

app.get("/users", async (request,response)=>{
    const result = await db.query(`SELECT
    users.id,
        users.username,
        users.email,
        ARRAY_AGG(posts.title) AS titles,
        ARRAY_AGG(posts.content) AS contents,
        ARRAY_AGG(posts.link) AS links,
        ARRAY_AGG(categories.category_name) AS category_names
    FROM
        users
    JOIN
        posts ON users.id = posts.user_id
    JOIN
        categories ON posts.category_id = categories.id
    GROUP BY
    users.id,
        users.username,
        users.email;

`);
    response.json(result.rows);
});

app.post("/user", async (req, res) => {
    const { username, email, titles, contents, links, category_names } = req.body;

    const userQuery = await db.query(
        `INSERT INTO users(username, email) VALUES($1, $2) RETURNING id`,
        [username, email]
    );
    const userId = userQuery.rows[0].id;

    for (let i = 0; i < titles.length; i++) {
        await db.query(
            `INSERT INTO posts(title, content, link, category_id, user_id) VALUES($1, $2, $3, (SELECT id FROM categories WHERE category_name = $4), $5)`,
            [titles[i], contents[i], links[i], category_names[i], userId]
        );
    }

    res.json({ success: true });
});

app.get('/categories', async (request, response) => {
      const result = await db.query('SELECT * FROM categories');
      response.json(result.rows);
    
  });

app.listen(8080,()=> console.log("I'm running on 8080"));