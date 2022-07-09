require('dotenv').config()
const express = require("express");
const auth = require("../../utils/middlewares/auth");
const routerStore = express.Router();

routerStore.get("/store", auth, (req, res) => {
  const sessionData = req.session;
  res.render("store.ejs", { sessionData });
});

module.exports = routerStore;
