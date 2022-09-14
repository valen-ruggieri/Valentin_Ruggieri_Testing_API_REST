const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const request = require("supertest")("http:localhost:8080");

describe("🛒Funcionalidad de los metodos del cart", () => {
  it("comprobar metodo GET /cart", async () => {
    let response = await request.get("/cart");
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo POST /cart/addproduct/:id", async () => {
    let productId = "dsfd32423";
    let response = await request.get(`/cart/addproduct/${productId}`);
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo DELETE /cart/deleteproduct/:id", async () => {
    let idProduct = "63221cf29473c5801cd4bc24";
    let response = await request.get(`/cart/deleteproduct/${idProduct}`);
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo DELETE /cart/deleteall", async () => {
    let response = await request.get(`/cart/deleteall`);
    expect(response.status).to.eql(200);
  });
  it("Comprobar metodo GET /cart/buyAll", async () => {
    let response = await request.get(`/cart/buyAll`);
    expect(response.status).to.eql(200);
  });
});
