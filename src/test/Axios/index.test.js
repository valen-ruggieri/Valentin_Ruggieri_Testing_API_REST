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
const updateProduct = async () => {
  try {
    await axios.post(
      "http://localhost:8080/store/updateproduct/6320ea0e1559b15ddfdcb54c",
      {
        titulo: "reloj",
        precio: "1200",
        descripcion: "es un reloj",
        codigo: "rel755",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async () => {
  try {
    const product = await axios.get(
      "http://localhost:8080/store/deleteproduct/6320ea0e1559b15ddfdcb54c"
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
