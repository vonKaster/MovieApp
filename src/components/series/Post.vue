<template>
  <div>
    <v-container class="d-flex justify-center">
      
      <v-card class="elevation-2 justify-center" max-width="550">
        <v-card-title>
          <v-avatar size="48">
            <img :src="'https://i.pravatar.cc/100?img=' + postId.userId" alt="">
          </v-avatar>
          <v-card-subtitle >{{ user.nombre}}  </v-card-subtitle>
        </v-card-title>
      
         <v-img class="mb-5" :src="'https://picsum.photos/id/' +this.$route.params.id + '/600/400'" height="300"></v-img>
        <v-card-text class="pa-2">{{ postId.body }}</v-card-text>
        
        <v-card-actions>
          <v-btn icon>
            <v-icon color="red">mdi-heart</v-icon>
              <span>{{ likes }}</span>
            
          </v-btn>
          
          <v-btn icon @click="showComments = !showComments">
            <v-icon>mdi-comment</v-icon>
    
              <span>{{ comments.length }}</span>
    
          </v-btn>
        </v-card-actions>
        
        <v-slide-y-transition>
          <v-list v-if="showComments" max-width="550">
            <v-list-item v-for="comment in comments" :key="comment.postId.id + '-' + comment.id">
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle class="subtitle-1 grey--text">{{ comment.postId.email }}</v-list-item-subtitle>
                <v-list-item-content>{{ comment.postId.body }}</v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-slide-y-transition>
        
      </v-card>
    </v-container>
  </div>
</template>



<script>

import post from '@/store/posts'
import users from "@/store/users";

export default {
  data(){
    return{
      showComments: false,
      likes: 0,
     comments:[],
     postId:{},
     user:{}
    }
  },

  async created() {
    document.title = "Digicard | Post";
  },

  async mounted() {
    const id = this.$route.params.id;
    try {
      this.comments = await post.dispatch("getComments", id)
      console.log(this.comments)
      this.postId= await post.dispatch("getPostById", id)
      console.log(this.postId)
      this.user = await  await users.dispatch("getUserById",this.postId.userId)
      console.log(this.user)
    } catch (error) {
      console.log(error);
    }
  },
  
}
</script>
<style>

</style>