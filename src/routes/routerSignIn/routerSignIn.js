require("dotenv").config();
const express = require("express");
const routerSignIn = express.Router();
const { userDao } = require("../../DAOs/swicht");
const cookieParser = require("cookie-parser");

routerSignIn.use(cookieParser("secret"));

routerSignIn.get("/signin", (req, res) => {
  res.render("signIn.ejs",{message:'Puedes iniciar sesión aquí', error:false});
});

routerSignIn.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const userData = await userDao.getByUser({ email, password })

  if (userData && req.signedCookies.uID) {
    const { user, userType, id } = userData;
    req.session.user = user;
    req.session.email = email;
    req.session.password = password;
    req.session.usertype = userType;
    req.session.uID = req.signedCookies.uID
    return res.redirect("/store");
  }else{
    return  res.render("signIn.ejs",{message:'El usuario que intentas ingresar no existe, prueba registrandote', error:true});
}
  
});

module.exports = routerSignIn;
