const express = require("express");
const routerLogOut = express.Router();
const { userDao } = require("../../DAOs/swicht");

routerLogOut.get("/logout", async (req, res) => {
const idUser = req.session.uID;;
await userDao.deleteById(idUser)
res.redirect('/login')
});


module.exports = routerLogOut;
