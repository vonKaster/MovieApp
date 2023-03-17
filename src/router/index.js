import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import UserView from '../views/UserView.vue'
import PostView from '../views/PostView.vue'
import PerfilUserView from '../views/PerfilUserView.vue'


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
    path: '/users',
    name: 'users',
    component: UsersView,
    props: (route) => ({ deletedId: route.query.deletedId })
  },
  {
    path: '/users/:id',
    name: 'user',
    component: UserView
  },
  {
    path: '/perfil/:id',
    name: 'perfil',
    component: PerfilUserView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
