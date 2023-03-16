import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/posts'
import Post from '../models/posts'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      service: new service(),
      allPosts:[],
      allComments:[],
      postById:{},
      showAdd: false,
      new:[],
      edit:{},
      deleteItem:{}
    },
    mutations:{
        setAllPost(state, payload){
            state.allPosts = payload;
        },
        setPostById(state, payload){
          state.postById = payload;
        },
        setNew(state,data){
          state.new = data
        },
        setShowAdd(state,data){
          state.showAdd = data
        },
        setEdit(state, data) {
          state.edit = data;
        },
        setDeleteItem(state, data) {
          state.deleteItem = data
        },
        setAllComments(state, payload){
          state.allComments = payload
      },

       
     

    },
    getters:{
     
    },
    actions:{
     
    async getPost({ state, commit }) {
      return new Promise(async (resolve, reject) => {
        try{
            let item = await state.service.getAllPost();
            commit("setAllPost", item );
            resolve(true);
        }
        catch (error) {
          reject(error);
        }
        });
         },

         async getPostById(state, id) {
          try {
            let item = await state.state.service.getPostById(id);
            state.commit("setPostById", item);
            return item;
          } catch (error) {
            throw error;
          }
        },

    async getComments(state, id) {
      try {
        let item = await state.state.service.getComments(id);
        state.commit("setAllComments", item);
        return item;
      } catch (error) {
        throw error;
      }
    },

        
        async new(state) {
          console.log('store',state)
          return new Promise(async (resolve, reject) => {
            try {
              await state.state.service.new(state.state.new).then((data) => {
                let item = state.state.new
                let options = state.state.allPosts
                let newItem = Post.fromJson({
                  id:data.id,
                  userId: item.userId,
                  title: item.title,
                  body: item.body,
                  
                })
                options.unshift(newItem);
                state.commit('setAllPost', options)
                resolve(true)
              })
            }
            catch (error) {
              reject(error)
              console.log(error)
            }
          })
  
      },
      async edit(state) {
        console.log('store id', state)
        return new Promise(async (resolve, reject) => {
          try {
            await state.state.service.edit(state.state.edit).then(() => {
              let item = state.state.edit
              let options = state.state.allPosts
              options = options.map((option)=>{
              if(option.id != item.id){
                return option
              }
              item = Post.fromJson({
                id:item.id,
                userId: item.userId,
                title: item.title,
                body: item.body,
                
              })
              console.log(item)
              return item
              })
              state.commit('setAllPost', options)
              resolve(true)
            })
          }
          catch (error) {
            reject(error)
          }
        })

      },
      async delete(state) {
        console.log(state,'delete store')
        return new Promise(async (resolve, reject) => {
          try {
         await state.state.service.delete(state.state.deleteItem).then(() => {
          let options = state.state.allPosts
       
          options = options.filter(option => {
            return option.id != state.state.deleteItem
          })
  
              state.commit('setAllPost', options)
              resolve(true)
            });
          } catch (error) {
            reject(error)
            console.log(error)
    
          }
        })
       
      },
          
        

      },
      modules:{

      }
  
})