const axios = require("axios");

const getProducts = async () => {
  try {
    const products = await axios.get("http://localhost:8080/store");
    console.log(products.data);
  } catch (error) {
    console.log(error);
  }
};

const postProduct = async () => {
  try {
    await axios.post("http://localhost:8080/store/addproduct", {
      titulo: "pelota",
      precio: "566",
      descripcion: "es una pelota",
      codigo: "ple455",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getProducts, postProduct };
