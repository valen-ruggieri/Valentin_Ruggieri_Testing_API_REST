require('dotenv').config()
const express = require("express");
const auth = require("../../utils/middlewares/auth");
const routerHome = express.Router();


routerHome.get("/", auth, (req, res) => {
  const sessionData = req.session;
  
//  if(!req.session){
//   console.log('sessios sin data home')
//   return res.render("home.ejs", { sessionData })}
  res.render("home.ejs", { sessionData });
});

module.exports = routerHome;
