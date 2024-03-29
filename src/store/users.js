import Vue from "vue";
import Vuex from "vuex";

import users from "@/models/users";

import service from "@/services/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    service: new service(),
    allUsers: [],

    userById: {}

  },
  getters: {},
  mutations: {
    setAllUsers(state, data) {
      state.allUsers = data;
    },
    setUserById(state, data) {
      state.userById = data;
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

    async getUserById(state, id) {
      try {
        let item = await state.state.service.getUserById(id);
        state.commit("setUserById", item);
        return item;
      } catch (error) {
        throw error;
      }
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
          let item = await state.state.service.editUser(data);
          let allUsers = state.state.allUsers;
          allUsers = allUsers.map((user) => {
            if (user.id == data.id) {
              user = {
                nombre: item.name,
                nombreUsuario: item.username,
                correo: item.email,
                telefono: item.phone,
                sitioWeb: item.website,
                direccion: {
                  calle: item.address.street,
                  departamento: item.address.suite,
                  ciudad: item.address.city,
                  codigoPostal: item.address.zipcode,
                },
              };
            }
            return user;
          });
          
          state.commit("setAllUsers", allUsers);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    async deleteUser(state, userId) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.deleteUser(userId);
          let allUsers = state.state.allUsers;

          allUsers = allUsers.filter((user) => {
            return user.id != userId;
          });
          state.commit("setAllUsers", allUsers);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  modules: {},
});
