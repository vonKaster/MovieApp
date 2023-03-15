import axios from "axios";
import todos from "@/models/todos";

class service {
  
  getTasksByUserId(id) {
    const url = `https://jsonplaceholder.typicode.com/todos`;
  
    return axios.get(`${url}`).then(({ data }) => {
      return data.filter((item) => {
        return +item.userId === +id;
      }).map((item) => {
        return todos.fromJson(item);
      });
    });
  }
  
  async deleteTask(id) {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    await axios.delete(`${url}${id}`);
  }

}

export default service;
