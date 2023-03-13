<template>
  <v-app>
    <navBar />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import navBar from './components/commons/navBar.vue';
import Footer from "./components/commons/Footer.vue";

export default {
  name: 'App',
  components: {navBar, Footer},

  data: () => ({
    //
  }),
};
</script>
