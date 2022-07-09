const express = require("express");
const routerError = express.Router();

routerError.get("/errorExpiredSession", async (req, res) => {
  res.render("errorExpiredSession.ejs");
});

routerError.get("/errorPermissionDenegated", (req, res) => {
      res.render("errorPermissionDenegated.ejs");
});

module.exports = routerError;
