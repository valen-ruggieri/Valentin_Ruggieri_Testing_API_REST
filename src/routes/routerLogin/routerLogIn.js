require("dotenv").config();
const express = require("express");
const routerLogIn = express.Router();
const { userDao } = require("../../DAOs/swicht");
const cookieParser = require("cookie-parser");

routerLogIn.use(cookieParser("secret"));

routerLogIn.get("/login", (req, res) => {
  req.session.user
    ? console.log("sesion ya existente")
    : console.log("logearse de nuevo");
  res.render("logIn.ejs");
});

routerLogIn.post("/login", async (req, res) => {
  const { name, email, password, userType } = req.body;

  req.session.user = name;
  req.session.email = email;
  req.session.password = password;
  req.session.usertype = userType;

  const uID = await userDao.create({
    user: req.session.user,
    email: req.session.email,
    password: req.session.password,
    userType: req.session.usertype,
  });
  req.session.uID = uID;
  res.cookie("uID", uID, { signed: true });
  res.redirect("/");
});

module.exports = routerLogIn;
