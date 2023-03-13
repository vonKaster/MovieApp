import axios from "axios";
import users from "@/models/users";

class service {

  getAllUsers() {
    const url = "https://jsonplaceholder.typicode.com/users";

    return axios.get(`${url}`).then(({ data }) => {
      return data.map((item) => {
        return users.fromJson(item);
      });
    });
  }
  
}

export default service;
