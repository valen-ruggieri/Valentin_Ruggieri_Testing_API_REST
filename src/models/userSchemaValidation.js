const yup = require("yup");

const userschemaValidation = yup.object({
  name: yup.string().max(10,'El nombre debe contener maximo 10 caracteres').matches(/^[A-Za-z ]*$/, 'Por favor ingrese un nombre valido').required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8,'La contrasena debe contener mas de 8 caracteres')
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "La contrasena debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
    ),
  userType: yup.string().required(),
});


module.exports = userschemaValidation;

