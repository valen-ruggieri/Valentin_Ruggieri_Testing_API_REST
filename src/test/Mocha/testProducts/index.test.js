const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const request = require("supertest")("http://localhost:8080");

describe("🎁Funcionalidad de los metodos del store", () => {
  it("comprobar metodo GET /store", async () => {
    let response = await request.get("/store");
    expect(response.status).to.eql(200);
  });

  it("comprobar metodo POST /store/addproduct", async () => {
    let product = {
      titulo: "prodPost",
      precio: "667",
      descripcion: "prueba supertest",
      codigo: "cod999",
    };
    let response = await request.post("/store/addproduct").send(product)
    expect(response.status).to.eql(302);
  });
  it("comprobar metodo PUT /store/updateproduct/:id", async () => {
    let product = {
      titulo: "prodUpdate",
      precio: "337",
      descripcion: "prueba supertest",
      codigo: "cod229",
    };
    let idProduct = "63221cf29473c5801cd4bc24";
    let response = await request
      .post(`/store/updateproduct/${idProduct}`)
      .send(product);
    expect(response.status).to.eql(302);
  });

   it("comprobar metodo DELETE /store/deleteproduct/:id", async () => {

     let idProduct = '63221cf29473c5801cd4bc24'
     let response = await request.get(`/store/deleteproduct/${idProduct}`)
     expect(response.status).to.eql(302);
   });

   })

