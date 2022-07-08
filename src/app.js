const express = require("express");
const app = express();
const path = require("path");
const routerHome = require("./routes/routerHome/routerHome");
const routerLogIn = require("./routes/routerLogin/routerLogIn");
const routerLogOut = require("./routes/routerLogOut/routerLogOut");


app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname + '/public/views'));
app.set("view engine", "ejs");
app.use('/',routerHome);
app.use('/',routerLogIn);
app.use('/',routerLogOut);


module.exports = app;
