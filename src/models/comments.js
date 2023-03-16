class comentario {
    constructor(postId, id, name, email, body) {
        this.postId =postId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
		
    }
  
    static fromJson(postId, id, name, email, body) {
      return new comentario(postId, id, name, email, body);
    }
  }
  
  export default comentario;
  