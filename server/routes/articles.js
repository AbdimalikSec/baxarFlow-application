const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

router.get("/", (req, res) => {
  const sql = "select * from articles";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    /*// Modify the data to include the full image path or URL
        const modifiedData = data.map((article) => {
            return {
            ...article,
            img: `http://example.com${article.img}`, // Replace with the appropriate base URL
        };
        });
      
    return res.json(modifiedData); */

    return res.json(data);
  });
});

module.exports = router;
