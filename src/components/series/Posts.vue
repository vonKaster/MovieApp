<template>
  <v-container>
    <v-row>
      <v-col v-for="(post, index) in allPosts" :key="index" cols="12" sm="6" md="4">
        <v-card class="tweet-card">
          <v-card-title>
            <v-avatar size="36">
              <img :src="'https://i.pravatar.cc/100?img=' + post.userId" alt="">
            </v-avatar>
            <div class="tweet-user-info">
              <div class="tweet-username">User {{ post.userId }}</div>
              <div class="tweet-time">5 hours ago</div>
            </div>
          </v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'Post', params: { id: post.id } }" text>Read more</v-btn>
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
  </v-container>
</template>


<style scoped>
<style scoped>
.tweet-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #e8e8e8;
}

.tweet-author {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
}

.tweet-author-name {
  font-weight: bold;
}

.tweet-author-username {
  color: #828282;
  font-size: 0.8rem;
}
</style>



<script>
import post from '@/store/posts'
export default {
  data(){
    return{

    }
  },
   mounted() {

    //realiza una solicitud para obtener una lista de productos.
      post.dispatch('getPosts').then(() => {
        console.log('productos cargados')
      });
   },
   computed: {
    //retorno los post del state
    allPosts(){
      return post.state.allPosts
      }
   }
  
}
</script>
