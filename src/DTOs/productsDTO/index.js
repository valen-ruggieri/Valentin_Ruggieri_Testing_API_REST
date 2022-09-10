class ProductDTO {
  constructor(datos) {
    this.titulo = datos.titulo;
    this.descripcion = datos.descripcion;
    this.timestamp = datos.timestamp;
    this.precio = datos.precio;
    this.img = datos.img;
    this.codigo = datos.codigo;
  }
}

module.export = ProductDTO;
