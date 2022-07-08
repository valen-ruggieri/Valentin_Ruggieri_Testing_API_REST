const express = require("express");
const auth = require("../../utils/middlewares/auth");
const routerHome = express.Router();
const session = require("express-session");

routerHome.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3000 },
  })
);

routerHome.get("/", auth, (req, res) => {
  const sessionData = req.session;
  res.render("home.ejs", { sessionData });
});

module.exports = routerHome;
