require("dotenv").config();
const express = require("express");
const routerLogIn = express.Router();
const passport = require("passport");
const userschemaValidation = require("../../models/userSchemaValidation");
const userValidation = require("../../utils/middlewares/authValidation");

routerLogIn.get("/loginerror", (req, res) => {
  res.render("logIn.ejs", {
    message: "el usuario que intentas crear ya existe, prueba iniciando sesion",
    error: true,
  });
});

routerLogIn.get("/login", (req, res) => {
  res.render("logIn.ejs", { message: "Puedes registrarte aquí", error: false });
});

routerLogIn.post(
  "/login",
  userValidation(userschemaValidation),
  passport.authenticate("signUp", {
    successRedirect: "/store",
    successMessage: "registro exitoso",
    failureRedirect: "/loginerror",
    failureMessage: "fallo en el registro",
    passReqToCallback: true,
  })
);

routerLogIn.post(
  "/loginerror",
  userValidation(userschemaValidation),
  passport.authenticate("signUp", {
    successRedirect: "/store",
    successMessage: "registro exitoso",
    failureRedirect: "/loginerror",
    failureMessage: "fallo en el registro",
    passReqToCallback: true,
  })
);

module.exports = routerLogIn;
