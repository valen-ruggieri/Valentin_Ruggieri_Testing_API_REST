const logger = require("../loggers/loggers");

const yup = require("yup");

const productSchema = yup.object({
  titulo: yup
    .string()
    .max(10)
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  precio: yup.string().max(7).required(),
  descripcion: yup.string().min(6).max(20).required(),
  codigo: yup.string().min(6).max(7).required(),
});

const validationProduct = (method) => async (req, res, next) => {
  const body = req.body;
  try {
    await productSchema.validate(body);
    logger.info(`${method} success ✔`);
    next();
  } catch (error) {
    const { id } = req.params;
    const errorName = error.name;
    const errorDescription = error.errors;
    logger.error(errorDescription[0], errorName, id);
    if (method === "add") {
      return res.redirect("/store/addproduct");
    } else if (method === "update") {
      return res.redirect(`/store/updateproduct/${id}`);
    } else {
      return res.redirect("/store");
    }
  }
};

module.exports = validationProduct;
