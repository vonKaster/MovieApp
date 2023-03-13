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
            console.log(item);
  
            state.commit("setAllUsers", item);
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      },
  },
  modules: {},
});
