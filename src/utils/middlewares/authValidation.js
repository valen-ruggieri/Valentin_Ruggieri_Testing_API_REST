const logger = require("../loggers/loggers");
const userValidation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    logger.error(error)
    return res.render("login.ejs", {
      message: ` ${error.errors}`,
      error: true,
    });
  }
};

module.exports = userValidation;
