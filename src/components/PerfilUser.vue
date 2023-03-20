<template>
  <v-container>
     <div class="text-center mt-6" v-if="!isLoaded">
        <v-progress-circular
          :size="70"
          :width="7"
          :color="'#6247aa'"
          indeterminate
        ></v-progress-circular>
     </div>
    <!-- Información del usuario -->
    <v-row v-if="isLoaded">
      <v-col cols="4">
        <v-avatar size="120" class="ml-5">
          <img :src="'https://i.pravatar.cc/100?img='+ user.id" alt="photoUser">
        </v-avatar>
         <v-card-title>{{ user.nombreUsuario }}</v-card-title>
      </v-col>
   <v-col cols="8">
         <v-row class="mt-3">
            <v-col cols="4" class="text-center">
              <p> {{allPosts.length}}</p>
               publicaciones
            </v-col>
             <v-col cols="4" class="text-center">
              <p> {{ Math.floor(Math.random() * 161) + 40 }} </p>
               seguidos
            </v-col>
             <v-col cols="4" class="text-center">
              <p> {{ Math.floor(Math.random() * 161) + 40 }}</p>
               seguidores
            </v-col>
   
         </v-row>  

   </v-col>
    </v-row>

    <!-- Lista de publicaciones -->
    <v-row>
       <v-col v-for="post in allPosts" :key="post.id" cols="4">
        <v-card class="elevation-0">
          <v-img :src="'https://picsum.photos/id/' + post.id + '/600/400'" aspect-ratio="1"></v-img>
          <v-card-actions class="px-2">
            <v-icon small class="mr-1">mdi-heart-outline</v-icon>
            10
            <v-spacer></v-spacer>
            <v-icon small class="mr-1">mdi-message-outline</v-icon>
            10
            <v-spacer></v-spacer>
            <v-icon small>mdi-send-outline</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import post from '@/store/posts'
import users from "@/store/users";

export default {
  data(){
    return{
      showComments: false,
      likes: 0,
     posts:[],
     postId:{},
     user:{},
     isLoaded:false
    }
  },

  async created() {
    document.title = "Digicard | Perfil";
  },

  async mounted() {
    const id = this.$route.params.id;
   
    try {
      this.user = await users.dispatch("getUserById",id)
      console.log(this.user)
      post.dispatch('getPost')
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
    this.isLoaded = true;
  }, 500);
  },
  computed:{
       allPosts(){
        const userId = this.user.id;
        const filterId = post.state.allPosts.filter(post => post.userId === userId);
        return filterId
      }
  },
   
   
}
</script>
<style>

</style>