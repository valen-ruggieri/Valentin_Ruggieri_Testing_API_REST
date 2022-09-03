const passport = require("passport");
const getSignIn = (req, res) => {
  res.render("signIn.ejs", {
    message: "Puedes iniciar sesión aquí",
    error: false,
  });
};
const getSignInError = (req, res) => {
  res.render("signIn.ejs", {
    message: "el usuario que buscas no existe, prueba registrandote",
    error: true,
  });
};
const postSignIn = passport.authenticate("signIn", {
  successRedirect: "/store",
  successMessage: "registro exitoso",
  failureRedirect: "/signinerror",
  failureMessage: "fallo en el inicio de sesion",
  passReqToCallback: true,
});

module.exports = { getSignIn, getSignInError, postSignIn };
