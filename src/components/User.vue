<template>
  <div>
    <v-container>
      <div class="text-center mt-6" v-if="!isLoaded">
        <v-progress-circular
          :size="70"
          :width="7"
          :color="'#6247aa'"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="isLoaded">
        <v-row>
          <v-col class="mx-auto" cols="12" md="6" lg="4">
            <v-card class="mt-4">
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <v-avatar class="ms-4"
                    ><v-img
                      width="48px"
                      :src="'https://i.pravatar.cc/100?img=' + usuario.id"
                    ></v-img
                  ></v-avatar>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-card-title v-on="on">
                        {{ usuario.nombre }}
                      </v-card-title>
                    </template>
                    <span>{{ usuario.nombre }}</span>
                  </v-tooltip>
                </div>
                <div>
                  <v-btn x-small text @click="openEditUserDialog(usuario)"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn x-small text @click="openDeleteUserDialog(usuario)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </div>
              </div>
              <div class="ms-4 mb-4">
                <v-card-text>
                  <h3
                    class="text-overline mb-2"
                    style="font-size: 14px !important"
                  >
                    información
                  </h3>
                  <p>
                    <v-icon class="mr-1" color="#6247aa">mdi-email</v-icon>
                    {{ usuario.correo }}
                  </p>
                  <p>
                    <v-icon class="mr-1" color="#6247aa">mdi-cellphone</v-icon>
                    {{ usuario.telefono }}
                  </p>
                  <p>
                    <v-icon class="mr-1" color="#6247aa">mdi-web</v-icon>
                    {{ usuario.sitioWeb }}
                  </p>
                  <p>
                    <v-icon class="mr-1" color="#6247aa">mdi-map-marker</v-icon>

                    {{ usuario.direccion.calle }} -
                    {{ usuario.direccion.departamento }} [{{
                      usuario.direccion.ciudad
                    }}, {{ usuario.direccion.codigoPostal }}]
                  </p>
                  <p>
                    <v-icon class="mr-1" color="#6247aa">mdi-domain</v-icon>
                    {{ usuario.compania.nombre }} - ({{
                      usuario.compania.eslogan
                    }})
                  </p>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <h2 class="text-center mt-4">Tareas del usuario</h2>
        <v-row>
          <v-col class="text-center">
            <v-btn class="mt-4 elevation-2" text @click="openAddTaskDialog()"
              >Crear Tarea</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="todo in getAllTasks" :key="todo.id">
            <div>
              <div class="d-flex">
                <v-card class="mt-2" width="400">
                  <div class="d-flex">
                    <v-icon class="ms-4">mdi-text-box</v-icon>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-card-title class="title" v-on="on">
                          {{ todo.id }} - {{ todo.titulo }}
                        </v-card-title>
                      </template>
                      <span>{{ todo.titulo }}</span>
                    </v-tooltip>
                  </div>
                  <div class="d-flex justify-space-between align-center">
                    <div class="d-flex">
                      <v-card-title @click="console.log('asd')"
                        >Completado:
                        <v-icon
                          color="green"
                          class="ms-2"
                          v-if="todo.completado"
                          >mdi-check</v-icon
                        >
                        <v-icon color="red" class="ms-2" v-else
                          >mdi-close</v-icon
                        >
                      </v-card-title>
                    </div>
                    <div>
                      <v-btn x-small text @click="openEditTaskDialog(todo)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      >
                      <v-btn x-small text @click="openDeleteTaskDialog(todo.id)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                      >
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>{{ selectedUser.nombre }}</v-card-title>
          <v-card-text>
            <div>
              <v-icon class="mr-2">mdi-account</v-icon>Nombre de usuario:
              {{ selectedUser.nombreUsuario }}
            </div>
            <div class="mt-2">
              <v-icon class="mr-2">mdi-email</v-icon>Correo Electrónico:
              {{ selectedUser.correo }}
            </div>
            <div class="mt-2">
              <v-icon class="mr-2">mdi-cellphone</v-icon>Teléfono:
              {{ selectedUser.telefono }}
            </div>
            <div class="mt-2">
              <v-icon class="mr-2">mdi-web</v-icon>Sitio Web:
              {{ selectedUser.sitioWeb }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#6247aa" text @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog width="500px" v-model="editUserDialog" persistent>
        <v-card class="text-center">
          <v-form
            @submit.prevent="
              editingUser ? editUser(userData) : createUser(userData)
            "
          >
            <v-card-title class="headline">
              {{
                editingUser
                  ? "Editar Usuario [" + selectedUser.id + "]"
                  : "Agregar Usuario"
              }}
            </v-card-title>
            <h3>
              <p>Nombre</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.nombre"
              append-icon="mdi-rename-box"
            ></v-text-field>

            <h3>
              <p>Usuario</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.nombreUsuario"
              append-icon="mdi-account-edit"
            ></v-text-field>

            <h3>
              <p>Correo Electrónico</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.correo"
              append-icon="mdi-email"
            ></v-text-field>

            <h3>
              <p>Teléfono</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.telefono"
              append-icon="mdi-cellphone"
            ></v-text-field>

            <h3>
              <p>Sitio Web</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.sitioWeb"
              append-icon="mdi-web"
            ></v-text-field>

            <h3>
              <p>Calle</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.direccion.calle"
              append-icon="mdi-map-marker"
            ></v-text-field>

            <h3>
              <p>Departamento</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.direccion.departamento"
              append-icon="mdi-numeric"
            ></v-text-field>

            <h3>
              <p>Ciudad</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.direccion.ciudad"
              append-icon="mdi-map-outline"
            ></v-text-field>

            <h3>
              <p>Codigo Postal</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="userData.direccion.codigoPostal"
              append-icon="mdi-counter"
            ></v-text-field>

            <v-card-actions>
              <v-btn
                text
                @click="
                  editUserDialog = false;
                  if (editingUser) editingUser = false;
                  resetUserData();
                "
                >Cancelar</v-btn
              >
              <v-btn type="submit" color="green" text>Confirmar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog width="500px" v-model="editTaskDialog" persistent>
        <v-card class="text-center">
          <v-form
            @submit.prevent="
              editingTask ? editTask(taskData) : createTask(taskData)
            "
          >
            <v-card-title class="headline">
              {{
                editingTask
                  ? "Editar Tarea [" + taskData.id + "]"
                  : "Agregar Tarea"
              }}
            </v-card-title>
            <h3>
              <p>Titulo</p>
            </h3>
            <v-text-field
              color="#6247aa"
              type="text"
              style="width: 400px"
              class="mx-auto"
              dense
              solo
              v-model="taskData.titulo"
              append-icon="mdi-rename-box"
            ></v-text-field>

            <div v-if="editingTask">
              <h3>
                <p>Estado</p>
              </h3>
              <v-select
                color="#6247aa"
                class="mx-auto"
                style="width: 400px"
                :items="options"
                label="Solo field"
                solo
                v-model="taskData.completado"
              ></v-select>
            </div>

            <v-card-actions>
              <v-btn
                text
                @click="
                  editTaskDialog = false;
                  if (editingTask) editingTask = false;
                  resetTaskData();
                "
                >Cancelar</v-btn
              >
              <v-btn type="submit" color="green" text>Confirmar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <v-dialog width="500px" v-model="deleteDialog" persistent>
        <v-card class="text-center">
          <v-card-title class="headline">
            {{
              deletingUser
                ? "Eliminar Usuario [" + selectedUser.id + "]"
                : "Eliminar Tarea [" + selectedTask + "]"
            }}
          </v-card-title>

          <h3>
            <p>
              {{
                deletingUser
                  ? "¿Estás seguro que deseas eliminar este usuario?"
                  : "¿Estás seguro que deseas eliminar esta tarea?"
              }}
            </p>
          </h3>
          <v-card-actions>
            <v-btn
              text
              @click="
                deleteDialog = false;
                if (deletingUser) deletingUser = false;
                resetUserData();
              "
              >Cancelar</v-btn
            >
            <v-btn
              color="red"
              text
              @click="
                deletingUser
                  ? deleteUser(selectedUser.id)
                  : deleteTask(selectedTask);
                deleteDialog = false;
                resetUserData();
              "
              >Confirmar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import users from "../store/users";
import todos from "../store/todos";
import router from "@/router";

export default {
  name: "User",

  data() {
    return {
      isLoaded: false,
      usuario: {},
      dialog: false,
      selectedUser: {},
      selectedTask: {},
      editUserDialog: false,
      deleteDialog: false,
      editTaskDialog: false,
      userEdited: null,
      taskData: {
        titulo: null,
        completado: null,
      },
      userData: {
        nombre: null,
        nombreUsuario: null,
        correo: null,
        telefono: null,
        sitioWeb: null,
        direccion: {
          calle: null,
          departamento: null,
          ciudad: null,
          codigoPostal: null,
        },
      },
      editingUser: false,
      editingTask: false,
      deletingUser: false,
      options: [
        { text: "Completada", value: true },
        { text: "No Completada", value: false },
      ],
    };
  },

  async created() {
    document.title = "Digicard | Usuario";
  },

  async mounted() {
    const id = this.$route.params.id;
    try {
      this.usuario = await users.dispatch("getUserById", id);
      await todos.dispatch("getTasksByUserId", id);
    } catch (error) {
      console.log(error);
    }
    this.isLoaded = true;
  },

  beforeDestroy() {
    this.user = null;
  },

  computed: {
    getAllTasks() {
      return todos.state.tasks;
    },
  },

  methods: {
    openEditUserDialog(user) {
      this.selectedUser = user;
      this.editingUser = true;
      this.editUserDialog = true;
      this.userData = user;
    },
    openDeleteUserDialog(user) {
      this.deletingUser = true;
      this.deleteDialog = true;
      this.selectedUser = user;
    },
    openDeleteTaskDialog(task) {
      this.deleteDialog = true;
      this.selectedTask = task;
    },
    openEditTaskDialog(task) {
      this.editingTask = true;
      this.editTaskDialog = true;
      this.taskData = task;
    },
    openAddTaskDialog() {
      this.editTaskDialog = true;
    },
    async createTask(data) {
      console.log("create task componente");
      this.editTaskDialog = false;
      await todos.dispatch("createTask", data);
      this.resetTaskData();
    },
    async editTask(data) {
      this.editTaskDialog = false;
      await todos.dispatch("editTask", data);
      this.selectedTask = {};
      this.resetTaskData();
      this.editingTask = false;
    },
    async editUser(data) {
      this.editUserDialog = false;
      await users.dispatch("editUser", data);
      this.selectedUser = {};
      this.resetUserData();
      this.editingUser = false;
    },
    async deleteUser(data) {
      this.deleteDialog = false;
      this.deletingUser = false;
      await users.dispatch("deleteUser", data);
      this.selectedUser = {};
      router.push({ name: "users", query: { deletedId: data } });
    },
    async deleteTask(id) {
      todos.dispatch("deleteTask", id);
    },
    resetUserData() {
      this.userData = {
        nombre: null,
        nombreUsuario: null,
        correo: null,
        telefono: null,
        sitioWeb: null,
        direccion: {
          calle: null,
          departamento: null,
          ciudad: null,
          codigoPostal: null,
        },
      };
    },
    resetTaskData() {
      this.taskData = {
        titulo: null,
        completado: null,
      };
    },
  },
};
</script>

<style scoped>
.theme--dark .v-btn {
  background-color: #1e1e1e !important;
  color: white;
}

.theme--dark .v-btn:before {
  background-color: #272727 !important;
}

.v-btn {
  background-color: #ffffff !important;
  color: black;
}

.v-btn:hover {
  color: #6247aa;
}

.v-btn--active {
  color: #6247aa !important;
}

.v-btn:before {
  background-color: #ffffff !important;
}

a {
  text-decoration: none !important;
  color: #6247aa !important;
}

.title {
  display: inline-block;
  font-size: 18px !important;
  color: #6247aa;
  max-width: 100%;
}
</style>
