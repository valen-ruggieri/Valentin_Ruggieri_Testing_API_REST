const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const request = require("supertest")("http:localhost:8080");

describe("funcionalidad de los metodos del store", () => {
  it("comprobar metodo getProducts", async () => {
    let response = await request.get("/cart");
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo postProducts", async () => {
    let productId = "dsfd32423";
    let response = await request.get(`/cart/addproduct/${productId}`);
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo deleteProducts", async () => {
    let idProduct = "63221cf29473c5801cd4bc24";
    let response = await request.get(`/cart/deleteproduct/${idProduct}`);
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo deleteAll", async () => {
    let response = await request.get(`/cart/deleteall`);
    expect(response.status).to.eql(200);
  });
  it("Comprobar metodo buyAll", async () => {
    let response = await request.get(`/cart/buyAll`);
    expect(response.status).to.eql(200);
  });
});
