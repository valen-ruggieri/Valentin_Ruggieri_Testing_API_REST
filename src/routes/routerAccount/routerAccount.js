require('dotenv').config()
const express = require("express");
const authPermissions = require('../../utils/middlewares/authPermissions');
const routerAccount = express.Router();
const { userDao } = require('../../DAOs/swicht');



routerAccount.get("/account", authPermissions, async(req, res) => {
   const sessionData = await userDao.getById(req.session.passport.user)
   const account =  await userDao.getAll()


res.render('account.ejs',{account:account[0],sessionData})

})
module.exports = routerAccount