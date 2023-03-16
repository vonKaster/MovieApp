import axios from "axios";
import todos from "@/models/todos";

class service {
  getTasksByUserId(id) {
    const url = `https://jsonplaceholder.typicode.com/todos`;

    return axios.get(`${url}`).then(({ data }) => {
      return data
        .filter((item) => {
          return +item.userId === +id;
        })
        .map((item) => {
          return todos.fromJson(item);
        });
    });
  }

  createTask(data) {
    const url = "https://jsonplaceholder.typicode.com/todos";
    console.log("data servicio", data);
    let payload = {
      title: data.titulo,
      completed: false,
    };

    return axios.post(`${url}`, payload);
  }

  async editTask(data) {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    let payload = {
      id: data.id,
      title: data.titulo,
      completed: data.completado,
    };
    try {
      const response = await axios.patch(`${url}${data.id}`, payload);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(`Error al editar la tarea: ${error.message}`);
    }
  }

  async deleteTask(id) {
    const url = "https://jsonplaceholder.typicode.com/todos/";
    await axios.delete(`${url}${id}`);
  }
}

export default service;
