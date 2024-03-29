import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: { name: "posts" },
  },
  {
    path: '/posts',
    name: 'posts',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostView
  },
  {
    redirect: { name: "home" },
  },
  
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },

  {
    path: '/users/:id',
    name: 'user',
    component: UserView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
