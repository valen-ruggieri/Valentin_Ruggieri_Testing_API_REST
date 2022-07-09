const express = require("express");
const routerError = express.Router();

routerError.get("/errorExpiredSession", async (req, res) => {
  res.render("errorExpiredSession.ejs");
});
module.exports = routerError;
