class direccion {
    constructor(calle, departamento, ciudad, codigoPostal) {
      this.calle = calle;
      this.departamento = departamento;
      this.ciudad = ciudad;
      this.codigoPostal = codigoPostal;
    }
  
    static fromJson({ street: calle, suite: departamento, city: ciudad, zipcode: codigoPostal }) {
      return new direccion(calle, departamento, ciudad, codigoPostal);
    }
  }
  
  export default direccion;
  