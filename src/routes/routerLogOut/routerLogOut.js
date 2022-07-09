const express = require("express");
const routerLogOut = express.Router();
const { userDao } = require("../../DAOs/swicht");
const cookieParser = require("cookie-parser");

routerLogOut.use(cookieParser("secret"));

routerLogOut.get("/logout", async (req, res) => {
  res.redirect("/");
});

routerLogOut.get("/deleteuser", async (req, res) => {
  const uID = req.signedCookies.uID;
  res.clearCookie("uID");

  await userDao
    .deleteById(uID)
    .then(() => {
      console.log(`cuenta de id: ${uID} eliminada con exito`);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("no se pudo eliminar la cuenta" + err);
    });

  req.session = " ";
});

module.exports = routerLogOut;
