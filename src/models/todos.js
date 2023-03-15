class todos {
    constructor(idUsuario, id, titulo, completado) {
      this.idUsuario = idUsuario;
      this.id = id;
      this.titulo = titulo;
      this.completado = completado;
    }
  
    static fromJson({ userId: idUsuario, id: id, title: titulo, completed: completado }) {
      return new todos(idUsuario, id, titulo, completado);
    }
  }
  
  export default todos;
  