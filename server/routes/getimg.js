const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE3,
});

//multer path

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage
});

router.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  console.log(image);
  const sql = "update images set image = ?";
  //database wx ka qaldan
  db.query(sql, [image], (err, result) => {
    if (err) {
      return res.json({ message: "error" });
    }
    return res.json({ status: "success" });
  });
});

router.get("/images", (req, res) => {
  const sql = "select * from images";
  db.query(sql, (err, result) => {
    if (err) return res.json("error");
    return res.json(result);
  });
});

module.exports = router;
