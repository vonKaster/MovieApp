import axios from "axios";
import post from "@/models/posts";
import comentario from "@/models/comments";

class PostService {
//traigo todos los posts de la API
getAllPost() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    return axios.get(url).then(({ data }) => {
        return data.map((item) => {
            return post.fromJson(item);
        });
    });
    }

getPostById(id){
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  
    return axios.get(url).then(({ data }) => {
      return post.fromJson(data);
    });
}
    

    new(data){
        const url = "https://jsonplaceholder.typicode.com/posts/";
        let payload ={
            title: data.title,
            body: data.body,
            userId: data.userId,
        }
         return axios.post(`${url}`, payload)
        
      }
      
    delete(id){
        console.log(id, 'delete srvice')
        const url = "https://jsonplaceholder.typicode.com/posts/"
        return axios
        .delete(`${url}${id}`)
      }

    edit(data){
        console.log('edit data',data)
        const url = "https://jsonplaceholder.typicode.com/posts/"
        let payload ={
            id:data.id,
            title: data.title,
            body: data.body,
            userId: data.userId,
        }
        return axios
        .put(`${url}${data.id}`, payload)
        
      }

    getComments(id){
        const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        return axios.get(url).then(({ data }) => {
            return data.map((item) => {
              return comentario.fromJson(item);
            });
        });
    }
    
 
}
export default PostService ;

