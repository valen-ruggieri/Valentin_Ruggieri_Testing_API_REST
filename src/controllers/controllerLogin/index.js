const passport = require("passport");

const getLogInError = (req, res) => {
  res.render("logIn.ejs", {
    message: "el usuario que intentas crear ya existe, prueba iniciando sesion",
    error: true,
  });
};

const getLogIn = (req, res) => {
  res.render("logIn.ejs", { message: "Puedes registrarte aquí", error: false });
};

const postLogIn = passport.authenticate("signUp", {
  successRedirect: "/store",
  successMessage: "registro exitoso",
  failureRedirect: "/loginerror",
  failureMessage: "fallo en el registro",
  passReqToCallback: true,
});

const postLogInError = passport.authenticate("signUp", {
  successRedirect: "/store",
  successMessage: "registro exitoso",
  failureRedirect: "/loginerror",
  failureMessage: "fallo en el registro",
  passReqToCallback: true,
});

module.exports = { getLogIn, getLogInError, postLogIn, postLogInError };
