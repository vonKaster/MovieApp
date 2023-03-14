import Vue from "vue";
import Vuex from "vuex";
import users from "@/models/users";
import service from "@/services/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    service: new service(),
    allUsers: [],
  },
  getters: {},
  mutations: {
    setAllUsers(state, data) {
      state.allUsers = data;
    },
  },
  actions: {
    async getAllUsers(state) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getAllUsers();
          state.commit("setAllUsers", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    async createUser(state, data) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.createUser(data);
          let allUsers = state.state.allUsers;
          let newUser = {
            nombre: item.data.name,
            nombreUsuario: item.data.username,
            correo: item.data.email,
            telefono: item.data.phone,
            sitioWeb: item.data.website,
            direccion: {
              calle: item.data.address.street,
              departamento: item.data.address.suite,
              ciudad: item.data.address.city,
              codigoPostal: item.data.address.zipcode,
            },
          };
          allUsers.push(newUser);
          state.commit("setAllUsers", allUsers);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },

    async editUser(state, data) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("DATA ID STORE:", data.id);
          let item = await state.state.service.editUser(data);
          let allUsers = state.state.allUsers;
          console.log("ITEM EN STORE, LLAMADA:", item);
          allUsers = allUsers.map((user) => {
            if (user.id != data.id) {
              return allUsers;
            }
            user = {
              nombre: item.data.name,
              nombreUsuario: item.data.username,
              correo: item.data.email,
              telefono: item.data.phone,
              sitioWeb: item.data.website,
              direccion: {
                calle: item.data.address.street,
                departamento: item.data.address.suite,
                ciudad: item.data.address.city,
                codigoPostal: item.data.address.zipcode,
              },
            };
            return user;
          });
          state.commit("setAllUsers", allUsers);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  modules: {},
});
