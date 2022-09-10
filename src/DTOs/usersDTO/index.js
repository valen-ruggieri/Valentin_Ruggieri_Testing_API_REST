class UsersDTO {
  constructor(datos) {
    this.user = datos.user;
    this.email = datos.email;
    this.password = datos.password;
    this.userType = datos.userType;
    this.address = datos.address;
    this.phone = datos.phone;
    this.image = datos.image;
    this.cartId = datos.cartId;
  }
}

module.export = UsersDTO;
