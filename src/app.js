require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routerError = require("./routes/routerError/routerError");
const routerHome = require("./routes/routerHome/routerHome");
const routerLogIn = require("./routes/routerLogin/routerLogIn");
const routerLogOut = require("./routes/routerLogOut/routerLogOut");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.URI,
      ttl: 10,
    }),
  })
);

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");
app.use("/", routerHome);
app.use("/", routerLogIn);
app.use("/", routerLogOut);
app.use("/", routerError);

module.exports = app;
