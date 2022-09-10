class SessionsDTO {
  constructor(datos) {
    this.expires = datos.expires;
    this.session = datos.session;
  }
}

module.export = SessionsDTO;
