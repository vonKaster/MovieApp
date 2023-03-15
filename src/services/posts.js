import axios from "axios";
import post from "@/models/posts";

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
    

    new(data){
        const url = "https://jsonplaceholder.typicode.com/posts";
        let payload ={
            title: data.title,
            body: data.body,
            userId: data.userId,
        }
         return axios.post(`${url}`, payload)
        
      }


    edit(data){
        console.log('edit data',data)
        const url = "https://jsonplaceholder.typicode.com/posts"
        let payload ={
            id:data.id,
            title: data.title,
            body: data.body,
            userId: data.userId,
        }
        return axios
        .put(`${url}${data.id}`, payload)
        
      }
      
    delete(id){
        const url = "https://jsonplaceholder.typicode.com/posts/"
        return axios
        .delete(`${url}${id}`, )
      }
    
 
}
export default PostService ;



