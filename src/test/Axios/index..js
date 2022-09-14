const axios = require("axios");

const getProducts = async () => {
  try {
    const products = await axios.get("http://localhost:8080/store");
    console.log(products.data);
  } catch (error) {
    console.log(error);
  }
};

const postProduct = async (data) => {
  try {
    await axios.post("http://localhost:8080/store/addproduct", {
      titulo: data.titulo,
      precio: data.precio,
      descripcion: data.descripcion,
      codigo: data.codigo,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (id, data) => {
  try {
    await axios.post(`http://localhost:8080/store/updateproduct/6${id}`, {
      titulo: data.titulo,
      precio: data.precio,
      descripcion: data.descripcion,
      codigo: data.codigo,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (id) => {
  try {
    const product = await axios.get(
      `http://localhost:8080/store/deleteproduct/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
