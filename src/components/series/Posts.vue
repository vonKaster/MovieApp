<template>
  <v-row>
    <v-col cols="2">
  
    </v-col>
    <v-col cols="10">
          <v-container >
    <v-row class="d-flex justify-center">
     <v-col cols="12">
          <v-btn class="mx-2" fab dark color="#6247AA" @click="openForm" fixed
      bottom
      right >
              <v-icon>mdi-plus</v-icon>
          </v-btn>
     </v-col>

     <v-col cols="4">
          <v-text-field
          color="#6247AA"
          v-model="search"
          label="Filtrar por publicacion"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          @input="filterPosts"
        >
        </v-text-field>
    </v-col>
    </v-row>
     <v-container fluid>
    <v-row align="center" justify="center" v-for="(post, index) in filteredPosts" :key="index">
      <v-col cols="12" sm="8" md="6">
        <v-card class="tweet-card">
          <v-card-title>
          <router-link :to="{ name:'perfil', params: { id: post.userId } }" class="tweet-user-link">
            <v-avatar size="40">
              <img :src="'https://i.pravatar.cc/100?img=' + post.userId" alt="">
            </v-avatar>
            <div class="tweet-user-info">
              <div class="tweet-username">{{ getUserEmail(post.userId) }}</div>
            </div>
          </router-link>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" class="mx-2">mdi-dots-vertical</v-icon>
              </template>
              <v-list>
                <v-list-item @click="openEdit(post)">
                  <v-icon>mdi-pencil</v-icon>
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteProduct(post)">
                  <v-icon>mdi-delete</v-icon>
                  <v-list-item-title>Eliminar</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
          <v-card-actions>
            <v-btn :to="{ name:'post', params: { id: post.id } }">Ver más</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showAdd" max-width="450">
  <v-card>
    <v-card-title>
      <v-avatar size="36">
        <img :src="'https://i.pravatar.cc/100?img=' + data.userId" alt="">
      </v-avatar>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="validate">
        <v-textarea
          v-model="data.body"
          filled
          label="What's Happenin?"
          :rules="rules"
          rows="4"
          autofocus
          counter
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="cancel">Cancel</v-btn>
      <v-btn
        rounded
        color="primary"
        :disabled="!valid"
        @click="validate"
      >
        tweet
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

  </v-container>
    </v-col>
  </v-row>

</template>

<script>
import post from '@/store/posts'
import users from '@/store/users'
import Alerts from '../series/Alerts.vue'
import navLateral from '@/components/commons/navLateral.vue'

export default {
  components:{Alerts, navLateral},
  data(){
    return{
       data:{
      id:null,
      userId: 1,
      title: '',
      body: '',
      },
      sheet:false,
      dataEdit: {},
      deleteItem: {},
      valid: true,
      rules: [(v) => !!v || "Campo requerido"],
      error: false,
      alertValidate: "",
      isEdit: false,
      showDelete: false,
      colorError: '#FF8D58',
      colorOk: '#09203f',
      textAlertOk: "",
      ok: false,
      errorAlert: false,    
      users:{},
      search:''
                
             

    }
  },
   mounted() {

    //realiza una solicitud para obtener una lista de productos.
      post.dispatch('getPost')
      users.dispatch("getAllUsers")
      
   },
   computed: {
    //retorno los post del state
    allPosts(){
       const posts = [...post.state.allPosts] // Obtengo una copia del array original
      return this.shuffle(posts) // Aplico la función shuffle y retorno el resultado
      },
    getAllUsers() {
      return users.state.allUsers;
    },

     filteredPosts(){
      return post.state.allPosts.filter(post => {
        return post.body.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    showAdd: {
       get() {
           return post.state.showAdd
        },
       set(newValue) {
          return newValue
        }
    }
   },
   methods:{
     filterPosts() {
      this.filteredPosts = post.state.allPosts.filter(post => {
       return post.body.toLowerCase().includes(this.search.toLowerCase())
    })
    },

      getUserEmail(userId) {
      const user = this.getAllUsers.find(user => user.id === userId);
      return user.nombreUsuario;
    },
    shuffle(array) {
    // Implementación de la función shuffle de Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
    //funcion para que v-dialog funcione
    openForm() {
        post.commit('setShowAdd', true)
        this.showAdd = true
    },
    add() {
    const payload = {
      userId: this.data.userId,
      title: this.data.title,
      body: this.data.body
    };

    // se tiene que hacer el set en el store con lo editado
    post.commit('setNew', payload)
                  post.dispatch('new').then(() => {
                        this.ok = true
                        this.textAlertOk = 'add Correct'
                  }).catch((e) => {
                        this.errorAlert = true
                        this.textAlertOk = e.response.data.error.message;
                  })
                  this.cancel()
  },
    openEdit(item) {
                  this.isEdit = true
                  post.commit('setShowAdd', true)
                  this.showAdd = true
                  this.data = {
                        id:item.id,
                        userId: this.data.userId,
                        title: item.title,
                        body: item.body
      
                  }
            },
            openDelete(item) {
                  this.deleteItem = item.id
            },
            cancel() {
                  post.commit('setShowAdd', false)
                  this.showAdd = false
                  if (!this.showAdd) {
                        //saca las rules y resetea la info
                        this.$refs.form.resetValidation();
                        this.data = {
                              id:null,
                              userId: this.data.userId,
                              title: '',
                              body:''
                        }
                        this.isEdit = false
                  } else {
                        this.showDelete = false
                  }
            },
            validate() {
                  //valida si el form cumple con todo 
                  let valid = this.$refs.form.validate()
                  if (valid) {
                        if (this.isEdit) {
                              this.edit()
                        } else {
                              this.add()
                        }
                  } else {
                        this.error = true
                        this.alertValidate = 'post es requerido'
                        setTimeout(() => {
                              this.error = false;
                        }, 2500);
                  }
            },
            edit() {
                  post.commit('setEdit', this.data)
                  post.dispatch('edit').then(() => {
                        this.ok = true
                        this.textAlertOk ='edit Correct'
                  }).catch((e) => {
                        this.errorAlert = true
                        this.textAlertOk ='no se edito ni mierda'
                        console.log(e)
                  })
                  this.cancel()
            },
            deleteProduct(item) {
                  this.deleteItem = item.id
                  post.commit('setDeleteItem', this.deleteItem)
                  post.dispatch('delete').then(() => {
                        this.ok = true
                        this.textAlertOk = 'delete correct'
                  }).catch((e) => {
                        this.errorAlert = true
                        this.textAlertOk = e.response.data.error.message;
                        conosole.log(e)
                  })
                  this.cancel()
            },
           
      }

  }
  
</script>
<style scoped>
.tweet-user-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color:#6247AA;
}
.tweet-user-link:hover {

 color:#9874fb;
}
.tweet-username {
  margin-left: 10px;
  font-weight: bold;
}

</style>
