class CartsDTO {
  constructor(datos) {
    this.timestamp = datos.timestamp;
    this.precioTotal = datos.precioTotal;
    this.products = datos.products;
  }
}

module.export = CartsDTO;
