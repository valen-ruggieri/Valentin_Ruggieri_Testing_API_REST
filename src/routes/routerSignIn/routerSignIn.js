require("dotenv").config();
const express = require("express");
const routerSignIn = express.Router();
const passport = require("passport");

routerSignIn.get("/signinerror", (req, res) => {
  res.render("signIn.ejs", {
    message: "el usuario que buscas no existe, prueba registrandote",
    error: true,
  });
});

routerSignIn.get("/signin", (req, res) => {
  res.render("signIn.ejs", {
    message: "Puedes iniciar sesión aquí",
    error: false,
  });
});

routerSignIn.post(
  "/signin",
  passport.authenticate("signIn", {
    successRedirect: "/store",
    successMessage: "registro exitoso",
    failureRedirect: "/signinerror",
    failureMessage: "fallo en el inicio de sesion",
    passReqToCallback: true,
  })
);

module.exports = routerSignIn;
