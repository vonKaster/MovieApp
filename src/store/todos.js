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

    async createTask(state, data) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.createTask(data);
          console.log("item store", item);
          let allTasks = state.state.tasks;
          let lastTask = allTasks[allTasks.length - 1];
          let lastTaskId = lastTask ? lastTask.id : 0;
          let newTask = {
            id: item.data.id, // asignamos el nuevo id
            titulo: item.data.title,
            completado: item.data.completed,
          };
          console.log("newTask store", newTask);
          await allTasks.push(newTask);
          await state.commit("setAllTasks", allTasks);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },

    async editTask(state, data) {
      return new Promise(async (resolve, reject) => {
        try {
          let item = await state.state.service.editTask(data);
          let allTasks = state.state.tasks;
          allTasks = allTasks.map((task) => {
            if (task.id == data.id) {
              task = {
                id: item.id,
                titulo: item.title,
                completado: item.completed,
              };
            }
            return task;
          });

          state.commit("setAllTasks", allTasks);
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
