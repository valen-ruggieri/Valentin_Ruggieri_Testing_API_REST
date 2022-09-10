const { searchUserById } = require("../../Repository/usersRepository");

const getAccount = async (req, res) => {
  const sessionData = await searchUserById(req.session.passport.user);
  const account = await searchUserById(req.session.passport.user);
  res.render("account.ejs", { account, sessionData });
};

module.exports = getAccount;
