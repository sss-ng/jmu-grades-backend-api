const express = require("express");
const { Pool } = require("pg");

require("dotenv").config();
const app = express();

const pool = new Pool({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    host: process.env.HOST,
});

// pool.connect()
//     .then((client) => {
//         return client;
//     })
//     .then((client) => {
//         return client.query("SELECT * FROM grades LIMIT 10");
//     })
//     .then(());

app.get("/data/:count", (req, res) => {
    const count = req.params.count;
    const queryString = {
        text: "SELECT * FROM grades LIMIT $1::int",
        values: [count],
    };
    pool.query(queryString)
        .then((response) => {
            res.json(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false, message: "there was an error" });
        });
});

// run the server
const port = 8000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
