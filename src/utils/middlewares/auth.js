function auth(req, res, next) {
  if (
    req.session.user == "valentin" &&
    req.session.usertype == "administrador"
  ) {
    return next();
  } else {
    console.log("Session Expirada");
    res.redirect("/errorExpiredSession");
  }
}
module.exports = auth;
