import axios from "axios";
import todos from "@/models/todos";

class service {
  
  getTodosByUserId(id) {
    const url = `https://jsonplaceholder.typicode.com/todos`;
  
    return axios.get(`${url}`).then(({ data }) => {
      return data.filter((item) => {
        return +item.userId === +id;
      }).map((item) => {
        return todos.fromJson(item);
      });
    });
  }
  
  
}

export default service;
