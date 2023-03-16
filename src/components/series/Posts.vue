<template>

  <v-container >
     <v-col cols="12">

          <v-btn class="mx-2" fab dark color="#6247AA" @click="openForm" >
              <v-icon>mdi-plus</v-icon>
          </v-btn>
    </v-col>

     <v-container fluid>
    <v-row align="center" justify="center" v-for="(post, index) in allPosts" :key="index">
      <v-col cols="12" sm="8" md="6">

        <v-card class="tweet-card">
          <v-card-title>
            <v-avatar size="36">
              <img :src="'https://i.pravatar.cc/100?img=' + post.userId" alt="">
            </v-avatar>

            <div class="tweet-user-info">
              <div class="tweet-username ml-3">{{ getUserEmail(post.userId) }}</div>

            </div>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" class="mx-2">mdi-dots-vertical</v-icon>
              </template>
              <v-list>
                <v-list-item @click="openEdit(post)">
                  <v-icon>mdi-pencil</v-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>

                <v-list-item @click="deleteProduct(post)">

                  <v-icon>mdi-delete</v-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
          <v-card-actions>

            <v-btn :to="{ name:'post', params: { id: post.id } }" text>Read more</v-btn>

            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>
    </v-row>
    <v-dialog v-model="showAdd"  >
                  <v-card>
                  
                         <v-btn text @click="cancel">
                                x
                      </v-btn>
                    <v-row class="mt-2 ml-5 mb-5">
                     <v-avatar size="40">
                      <img :src="'https://i.pravatar.cc/100?img=' + data.userId" alt="">
                    </v-avatar>
                    </v-row>

                        
                        <div class="flex-center">
                              <v-form ref="form" v-model="valid">
                                     <v-alert dense v-if="error" color="red" elevation="5" outlined text type="error"
                                          align="center" class="mr-1 ml-1">
                                          {{ alertValidate }}</v-alert>
                                    <v-text-field v-model="data.title" filled rounded dense label="titlePost"
                                          :rules="rules" />
                                    <v-textarea v-model="data.body" filled rounded dense label="What's Happenin?"
                                          :rules="rules" />
                              </v-form>
                        </div>
                      <v-card-actions class="d-flex justify-end">
                             <v-btn rounded @click="validate" color="primary" >
                              tweet
                              </v-btn>

                        </v-card-actions>
                  </v-card>

            </v-dialog>
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
          label="Qué está pasando?"
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
</template>
<script>
import post from '@/store/posts'
import users from '@/store/users'

import Alerts from '../series/Alerts.vue'

export default {
  components:{Alerts},
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
      users:{}

                
             

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

      getUserEmail(userId) {
      const user = users.state.allUsers.find(user => user.id === userId);
      return user.correo;
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
</style>
