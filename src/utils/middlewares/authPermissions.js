
function authPermissions(req, res, next) {

  if (
    req.signedCookies.uID &&
    req.session.user  &&
    req.session.usertype
  ) {
    return next();
  } else {
    console.log("Session Expirada");
    res.redirect("/errorExpiredSession");
  }
}
module.exports = authPermissions;
