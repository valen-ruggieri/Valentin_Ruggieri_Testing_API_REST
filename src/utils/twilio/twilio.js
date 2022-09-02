require("dotenv").config();
const twilio = require("twilio");
const logger = require("../loggers/loggers");
const twilioAccount = twilio(
  `${process.env.TWILIO_SID}`,
  `${process.env.TWILIO_TOKEN}`
);


const sendToWsp = async (querysnapshot,precioTotal,user,phone) => {
  const listWsp = querysnapshot.map(
    (e, index) =>
      `
      Producto ${index + 1} 
    
          titulo: ${e.titulo}
          precio: $${e.precio} 
          cantidad: ${e.cant} 
          codigo: ${e.codigo}
          subtotal: $${e.precio * e.cant}
          
          `);

  twilioAccount.messages
    .create({
      body: `
      Hola ${user}!! 
    Tu pedido se encuentra en proceso 🛒✔

    Lista de productos:

      ${listWsp.join("")}

      Total: $${precioTotal}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+549${phone}`,
    })
    .then(() => logger.info("enviado"))
    .catch((err) => logger.warn(err));
};
module.exports = sendToWsp;
