import Address from './address';
import Compania from './compania';

class usuario {
  constructor(id, nombre, nombre_usuario, correo, direccion, telefono, sitio_web, compania) {
    this.id = id;
    this.nombre = nombre;
    this.nombreUsuario = nombre_usuario;
    this.correo = correo;
    this.direccion = new Address(direccion.street, direccion.suite, direccion.city, direccion.zipcode);
    this.telefono = telefono;
    this.sitioWeb = sitio_web;
    this.compania = new Compania(compania.name, compania.catchPhrase, compania.bs);
  }
  static fromJson({ id, name: nombre, username: nombreUsuario, email: correo, address: direccion, phone: telefono, website: sitio_web, company: compania }) {
    return new usuario(id, nombre, nombreUsuario, correo, direccion, telefono, sitio_web, compania);
  }
}

export default usuario;
