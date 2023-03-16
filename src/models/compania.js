class compania {
    constructor(nombre, eslogan, descripcion) {
      this.nombre = nombre;
      this.eslogan = eslogan;
      this.descripcion = descripcion;
    }
  
    static fromJson({ name: nombre, catchPhrase: eslogan, bs: descripcion}) {
      return new compania(nombre, eslogan, descripcion);
    }
  }
  
  export default compania;
  