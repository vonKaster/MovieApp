class posts {
      constructor(userId, id, title, body) {
      this.userId = userId;
      this.id = id;
      this.title = title;
      this.body = body;
      }
      
      static fromJson({ userId, id, title, body }) {
      return new posts(userId, id, title, body);
      }
      }
      
export default posts;
