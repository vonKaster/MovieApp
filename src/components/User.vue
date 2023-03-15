<template>
  <div>
    <v-container>
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
                    <v-card-title
                      style="
                        font-size: 16px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      v-on="on"
                    >
                      {{ usuario.nombre }}
                    </v-card-title>
                  </template>
                  <span>{{ usuario.nombre }}</span>
                </v-tooltip>
              </div>
              <div>
                <v-btn x-small text @click="openEditDialog(usuario)"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn x-small text @click="openDeleteDialog(usuario)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
                <v-btn
                  x-small
                  text
                  class="mr-2"
                  @click="showUserDialog(usuario)"
                  ><v-icon>mdi-more</v-icon></v-btn
                >
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <h2 class="text-center mt-4">Tareas del usuario</h2>
      <v-row>
        <v-col v-for="todo in getAllTodos" :key="todo.id">
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
                    <v-card-title
                      >Completado:
                      <v-icon color="green" class="ms-2" v-if="todo.completado"
                        >mdi-check</v-icon
                      >
                      <v-icon color="red" class="ms-2" v-else>mdi-close</v-icon>
                    </v-card-title>
                  </div>
                  <div>
                    <v-btn x-small text @click="openEditDialog(usuario)"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn x-small text @click="openDeleteDialog(usuario)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                  </div>
                </div>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import users from "../store/users";
import todos from "../store/todos";

export default {
  name: "User",

  data() {
    return {
      isLoaded: false,
      usuario: {},
    };
  },

  async created() {
    document.title = "Digicard | Usuario";
  },

  async mounted() {
    const id = this.$route.params.id;
    try {
      this.usuario = await users.dispatch("getUserById", id);
      await todos.dispatch("getTodosByUserId", id);
    } catch (error) {
      console.log(error);
    }
    this.isLoaded = true;
  },

  beforeDestroy() {
    this.user = null;
  },

  computed: {
    getAllTodos() {
      return todos.state.todosById;
    },
  },

  methods: {},
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
