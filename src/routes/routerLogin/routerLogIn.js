require("dotenv").config();
const express = require("express");
const routerLogIn = express.Router();
const { userDao } = require("../../DAOs/swicht");
const cookieParser = require("cookie-parser");
const userValidation = require("../../utils/middlewares/authValidation");
const userschemaValidation = require("../../models/userSchemaValidation");



routerLogIn.use(cookieParser("secret"));

routerLogIn.get("/login", (req, res) => {
  req.session.user
    ? console.log("sesion ya existente")
    : console.log("logearse de nuevo");
  res.render("logIn.ejs",{message:'Puedes registrarte aquí',error:false});
});

routerLogIn.post("/login",userValidation(userschemaValidation), async (req, res) => {
  const { name, email, password, userType } = req.body;
  const existUser = await userDao.getByUser({ email, password })
  if(!existUser){
    req.session.user = name;
    req.session.email = email;
    req.session.password = password;
    req.session.usertype = userType;
    const uID = await userDao.create({
      user: req.session.user,
      email: req.session.email,
      password: req.session.password,
      userType: req.session.usertype,
    });
    req.session.uID = uID;
    res.cookie("uID", uID, { signed: true });
    return res.redirect("/store");
  }
  else{

    res.render("logIn.ejs",{message:'Ese usuario ya esta registrado, prueba con otro',error:true});

  }
  


  
  
});

module.exports = routerLogIn;
