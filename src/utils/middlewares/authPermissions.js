
function authPermissions(req, res, next) {
  
  if (
    req.session) {
    return next();
  } else {
    res.redirect("/errorExpiredSession");
  }
}
module.exports = authPermissions;
