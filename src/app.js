require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routerHome = require("./routes/routerHome/routerHome");
const routerError = require("./routes/routerError/routerError");
const routerSignIn = require("./routes/routerSignIn/routerSignIn");
const routerStore = require("./routes/routerStore/routerStore");
const routerLogIn = require("./routes/routerLogin/routerLogIn");
const routerLogOut = require("./routes/routerLogOut/routerLogOut");
const routerAccount = require("./routes/routerAccount/routerAccount");
const routerCart = require("./routes/routerCart/routerCart");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const multer = require("multer");

const storageContent = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(
  multer({
    storage: storageContent,
    dest: path.join(__dirname + "/public/images"),
    limits: { fileSize: 1000000 },
  }).single("image")
);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.URI,
      ttl: 10 * 60,
      autoRemove: "interval",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");
app.use("/", routerHome);
app.use("/", routerStore);
app.use("/", routerLogIn);
app.use("/", routerSignIn);
app.use("/", routerLogOut);
app.use("/", routerError);
app.use("/", routerAccount);
app.use("/", routerCart);

module.exports = app;
