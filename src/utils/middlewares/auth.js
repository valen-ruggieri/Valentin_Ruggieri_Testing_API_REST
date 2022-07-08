function auth(req, res, next) {
  console.log(req.session.cookie.maxAge);
  if (
    req.session?.user == "valentin" &&
    req.session?.usertype == "administrador"
  ) {
    return next();
  } else {
    res.status(401).send("error de autenticacion");
  }
}
module.exports = auth;
