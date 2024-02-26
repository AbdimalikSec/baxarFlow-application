const session = require("express-session");
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const passportSetup = require("./passport");

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
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("server is running!");
});
