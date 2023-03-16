import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/posts'
import router from '@/router'
import posts from "@/models/posts";


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      service: new service(),
      allPosts:[],
    },
    mutations:{
        setAllPost(state, payload){
            state.allPosts = payload
        }
       
     

    },
    getters:{
     
    },
    actions:{
     
        async getPosts({ state, commit }) {
            return new Promise(async (resolve, reject) => {
              try{
                let item = await state.service.getAllPosts();
                console.log(item)
          
                commit("setAllPost", item );
                resolve(true);
              }
              catch (error) {
                reject(error);
              }
            });
          },
          
        

      }
  
})