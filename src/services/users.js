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

  getUserById(id) {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  
    return axios.get(url).then(({ data }) => {
      return users.fromJson(data);
    });
  }
  
  getTodosByUserId(id) {
    const url = `https://jsonplaceholder.typicode.com/todos`;
  
    return axios.get(`${url}`).then(({ data }) => {
      return data.filter((item) => {
        return item.userId === id;
      }).map((item) => {
        return todos.fromJson(item);
      });
    });
  }
  

  createUser(data) {
    const url = "https://jsonplaceholder.typicode.com/users";
    let payload = {
      name: data.nombre,
      username: data.nombreUsuario,
      email: data.correo,
      phone: data.telefono,
      website: data.sitioWeb,
      address: {
        street: data.direccion.calle,
        suite: data.direccion.departamento,
        city: data.direccion.ciudad,
        zipcode: data.direccion.codigoPostal,
      },
    };

    return axios.post(`${url}`, payload);
  }

  async editUser(data) {
    const url = "https://jsonplaceholder.typicode.com/users/";
    let payload = {
      id: data.id,
      name: data.nombre,
      username: data.nombreUsuario,
      email: data.correo,
      phone: data.telefono,
      website: data.sitioWeb,
      address: {
        street: data.direccion.calle,
        suite: data.direccion.departamento,
        city: data.direccion.ciudad,
        zipcode: data.direccion.codigoPostal,
      },
    };
    try {
      const response = await axios.patch(`${url}${data.id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(`Error al editar el usuario: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    const url = "https://jsonplaceholder.typicode.com/users/";
    await axios.delete(`${url}${userId}`);
  }
}

export default service;
