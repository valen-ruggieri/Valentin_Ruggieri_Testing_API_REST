const getError = async (req, res) => {
  res.render("errorExpiredSession.ejs");
};

module.exports= getError