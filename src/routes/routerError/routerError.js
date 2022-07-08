const express = require("express");
const routerError = express.Router();
const cookieParser = require("cookie-parser");
const { userDao } = require("../../DAOs/swicht");

routerError.use(cookieParser('secret'));

routerError.get("/errorExpiredSession", async (req, res) => {
  const idUser = req.signedCookies.uID
  await userDao.deleteById(idUser)
  res.render("errorExpiredSession.ejs");
});

routerError.get("/errorPermissionDenegated", (req, res) => {
      res.render("errorPermissionDenegated.ejs");
});

module.exports = routerError;
