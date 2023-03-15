import Vue from "vue";
import Vuex from "vuex";
import service from "@/services/todos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    service: new service(),
    tasks: [],
  },
  getters: {},
  mutations: {
    setAllTasks(state, data) {
      state.tasks = data;
    },
  },
  actions: {
    async getTasksByUserId(state, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.getTasksByUserId(id);
          console.log("item", item);
          state.commit("setAllTasks", item);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    async deleteTask(state, id) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.deleteTask(id);
          let allTasks = state.state.tasks;

          allTasks = allTasks.filter((task) => {
            return task.id != id;
          });
          state.commit("setAllTasks", allTasks);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  modules: {},
});
