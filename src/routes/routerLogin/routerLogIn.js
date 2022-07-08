const express = require("express");
const routerLogIn = express.Router();
const session = require("express-session");
const { userDao } = require("../../DAOs/swicht");

routerLogIn.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
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
  req.session.uID = 'dsfsad#@$#@DFSF32432sads';
  const expiredSession = req.session.cookie._expires;
  const timeMaxSession = req.session.cookie.originalMaxAge;
  const uIDSession = req.session.uID;
  await userDao.create({
    uIDSession,
    expiredSession,
    timeMaxSession,
    user: name,
    email,
    password,
    userType,
  });
  res.redirect("/");
});

module.exports = routerLogIn;
