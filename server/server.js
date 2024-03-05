const session = require("express-session");
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const articleRoute = require("./routes/articles");
const loginRoute = require("./routes/login");
const getImgRoute = require("./routes/getimg");
const passportSetup = require("./passport");
const cookieParser = require("cookie-parser");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: "openreplay",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set it to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);



app.use("/auth", authRoute);
app.use("/article", articleRoute);
app.use("/sql", loginRoute);
app.use("/getimg", getImgRoute);

//http://localhost:5000/getimg/upload
//http://localhost:5000/getimg/images

app.listen("5000", () => {
  console.log("server is running!");
});
