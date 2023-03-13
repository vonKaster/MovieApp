import axios from "axios";
import Post from "@/models/posts";

class PostService {
  getAllPosts() {
    const url = "https://jsonplaceholder.typicode.com/posts";

    return axios.get(`${url}`).then(({ data }) => {
      return data.map((item) => {
        return Post.fromJson(item);
      });
    });
  }

  getPostById(id) {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    return axios.get(`${url}`).then(({ data }) => {
      return Post.fromJson(data);
    });
  }


}

export default PostService;
