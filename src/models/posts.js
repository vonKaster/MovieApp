class posts {
      constructor( id,userId, title, body) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.body = body;
      }
      
      static fromJson({  id, userId, title, body }) {
      return new posts(id, userId,  title, body);
      }
      }
      
export default posts;
