<template>
  <div>
    <v-container>
      <div v-if="!isLoaded">
        <v-row>
          <v-col
            v-for="usuario in getAllUsers"
            :key="usuario.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card class="mt-4">
              <v-skeleton-loader
                height="64px"

                width="371px"

                type="image"
              ></v-skeleton-loader>
              <v-card-title v-if="isLoaded">{{ usuario.nombre }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-if="isLoaded">
        <v-row>
          <v-col class="text-center">

            <v-btn class="mt-4" text @click="openAddDialog()"

              >Crear Usuario</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="usuario in getAllUsers"
            :key="usuario.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card class="mt-4">
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <v-avatar class="ms-4"

                    ><v-img width="48px" src="../assets/user.jpg"></v-img
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
      <v-dialog width="500px" v-model="editDialog" persistent>
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
                  editDialog = false;
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
      <v-dialog width="500px" v-model="deleteDialog" persistent>
        <v-card class="text-center">
          <v-card-title class="headline"
            >Eliminar Usuario [{{ selectedUser.id }}]</v-card-title
          >
          <h3>
            <p>¿Estás seguro que deseas eliminar este usuario?</p>
          </h3>
          <v-card-actions>
            <v-btn
              text
              @click="
                deleteDialog = false;
                resetUserData();
              "
              >Cancelar</v-btn
            >
            <v-btn
              color="red"
              text
              @click="
                deleteUser(selectedUser.id);
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

export default {
  name: "Users",

  data() {
    return {
      isLoaded: false,
      dialog: false,
      selectedUser: {},
      editDialog: false,
      deleteDialog: false,
      userEdited: null,
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
    };
  },

  created() {
    document.title = "Digicard | Usuarios";
  },

  async mounted() {
    try {
      await Promise.all([users.dispatch("getAllUsers")]);
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    getAllUsers() {
      return users.state.allUsers;
    },

  },

  methods: {
    showUserDialog(user) {
      this.selectedUser = user;
      this.dialog = true;
    },
    openEditDialog(user) {
      this.selectedUser = user;
      this.editingUser = true;
      this.editDialog = true;
      this.userData = user;
    },
    openAddDialog() {
      this.editDialog = true;
    },
    openDeleteDialog(user) {
      this.deleteDialog = true;
      this.selectedUser = user;
    },
    async createUser(data) {
      this.editDialog = false;
      await users.dispatch("createUser", data);
      this.selectedUser = {};
      this.resetUserData();
    },
    async editUser(data) {
      this.editDialog = false;
      await users.dispatch("editUser", data);
      this.selectedUser = {};
      this.resetUserData();
      this.editingProduct = false;
    },
    async deleteUser(data) {
      this.deleteDialog = false;
      await users.dispatch("deleteUser", data);
      this.selectedUser = {};
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
  },
};
</script>


<style>

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

</style>
