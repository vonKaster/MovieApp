import Vue from "vue";
import Vuex from "vuex";
import service from "@/services/todos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    service: new service(),
    todosById: [],
  },
  getters: {},
  mutations: {
    setAllTodosById(state, data) {
      state.todosById = data;
    },
  },
  actions: {
    async getTodosByUserId(state, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getTodosByUserId(id);
          console.log("item", item);
          state.commit("setAllTodosById", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  modules: {},
});
