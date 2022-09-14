const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const request = require("supertest")("http:localhost:8080");

describe("👥Funcionalidad de los metodos del user logIn", () => {
  it("comprobar metodo GET /login", async () => {
    let response = await request.get("/login");
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo POST /login", async () => {
    let user = {};
    let response = await request.post(`/login`).send(user);
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo GET /loginerror", async () => {
    let response = await request.get(`/loginerror`);
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo POST /loginerror", async () => {
    let user = {};
    let response = await request.get(`/loginerror`).send(user);
    expect(response.status).to.eql(200);
  });
});

describe("👥Funcionalidad de los metodos del user logOut", () => {
  it("comprobar metodo GET /logout", async () => {
    let response = await request.get("/logout");
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo GET /deleteUser", async () => {
    let response = await request.get(`/deleteuser`);
    expect(response.status).to.eql(200);
  });
});

describe("👥Funcionalidad de los metodos del user signIn", () => {
  it("comprobar metodo POST /signIn", async () => {
    let response = await request.get("/signin");
    expect(response.status).to.eql(200);
  });

  it("Comprobar metodo POST /signIn", async () => {
    let user = { name: "", email: "" };
    let response = await request.post(`/signin`).send(user);
    expect(response.status).to.eql(302);
  });

  it("Comprobar metodo GET /signInError", async () => {
    let response = await request.get(`/signinerror`);
    expect(response.status).to.eql(200);
  });
});


describe("👥Funcionalidad de los metodos del account", () => {
    it("comprobar metodo GET /account", async () => {
      let response = await request.get("/account");
      expect(response.status).to.eql(200);
    });
})