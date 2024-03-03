const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE2,
});

const verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.json({ message: "authentication err" ,err});
      }
      req.name = user.name;
      next();
    });
  } else {
    return res.json({ message: "no token" });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: "success", name: req.name });
});


router.post("/login", (req, res) => {
  const sql = "select * from login where email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ message: "server side error", err});
    }
    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ status: "success" });
    } else {
      return res.json({ message: "no user exists" });
    }
  });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({status: "success"})
})

module.exports = router;
