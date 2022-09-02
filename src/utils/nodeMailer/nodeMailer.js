require("dotenv").config();
const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASS}`,
  },
});

const sendMailWelcome = async (name, email, userType, address, age, phone) => {
  const mailOptions = {
    from: "ShopBasic <valeru.251@gmail.com>",
    to: email,
    subject: "Bienvenida",
    html: `<h1>Buenos dias ${name} nos da gusto tenerte en shopBasic!! 👋</h1>
        <h2>Datos de registro</h2>
        <h4>Nombre: ${name}</h4>
        <h4>Email: ${email}</h4>
        <h4>Tipo de usuario: ${userType}</h4>
        <h4>Direccion: ${address}</h4>
        <h4>Edad: ${age}</h4>
        <h4>Telefono: ${phone}</h4>
      `,
  };
  await transporter.sendMail(mailOptions);
};

const sendMailTicket = async (querysnapshot, precioTotal, email, user) => {
  const listEmail = querysnapshot.map(
    (e, index) =>
      `<div>
          <h3>Producto ${index + 1} </h3>
          <h4> titulo: ${e.titulo}</h4>
          <h4> precio: $${e.precio} </h4>
          <h4>cantidad: ${e.cant} </h4>
          <h4>codigo: ${e.codigo}</h4>
          <h4>subtotal: $${e.precio * e.cant}</h4>
          </div>`
  );
  const mailOptions = {
    from: "ShopBasic <valeru.251@gmail.com>",
    to: email,
    subject: `Nuevo pedido de ${user}`,
    html: `<h1>Gracias por comprar en shopBasic!! 🤝</h1>
         <h2>Datos de registro</h2>
         <h4>Nombre: ${user}</h4>
         <h4>Email: ${email}</h4>
         <h2>Lista de productos</h2>
         ${listEmail.join("")}
         <h3>Total: $${precioTotal}</h3>
    
       `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMailTicket, sendMailWelcome };
