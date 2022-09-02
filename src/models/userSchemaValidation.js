const yup = require("yup");

const userschemaValidation = yup.object({
  name: yup
    .string()
    .max(10, "El nombre debe contener maximo 10 caracteres")
    .matches(/^[A-Za-z ]*$/, "Por favor ingrese un nombre valido")
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "La contrasena debe contener mas de 8 caracteres")
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "La contrasena debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
    ),
  userType: yup.string().required(),
  address: yup
    .string()
    .max(18, "La direccion no puede ser tan extensa")
    .required(),
  age: yup
    .string()
    .max(2, "La edad no puede contener mas de dos digitos")
    .required(),
  phone: yup
    .string()
    .max(18, "Debe ser un numero de telefono valido")
    .required(),
});

module.exports = userschemaValidation;
