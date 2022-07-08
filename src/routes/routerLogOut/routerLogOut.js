const express = require("express");
const routerLogOut = express.Router();
const session = require("express-session");
const { userDao } = require("../../DAOs/swicht");

routerLogOut.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

routerLogOut.get("/logout", async(req, res) => {
// const id = req.session.id
// await userDao.deleteByIdSession(id)

  req.session.destroy((err) => {
    if (!err) {
      console.log("session Expirada");
      res.redirect("/login");
    } else {
      res.send("no se pudo finalizar la sesion " + err);
    }
  });
});

module.exports = routerLogOut;
