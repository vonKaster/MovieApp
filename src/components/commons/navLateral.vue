<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    class="sidebar"
    :mini-variant.sync="mini"
    :clipped.sync="clipped"
    :disable-route-watcher="true"
    :permanent="permanent"
  >
   <v-toolbar-title>
        <router-link :to="{ name: 'posts' }">
          <img class="mt-4" :src="require('../../assets/logodigicard.png')" />
        </router-link>
      </v-toolbar-title>
    <v-list>
    <v-list-item link v-for="(item, index) in items" :key="index" :to="item.to">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      clipped: false,
      mini: false,
      permanent: false,
      items: [
        { icon: 'mdi-home', title: 'Inicio', to: '/posts' },
        { icon: 'mdi-account-card-outline', title: 'Perfil', to: '/users' },
        { icon: 'mdi-cog-outline', title: 'Configuración', to: '/configuracion' },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  max-width: 100%;
  border-right: 1px solid #e6ecf0;
  box-shadow: none;
}
.sidebar .v-list-item__content {
  padding: 0;
}

.sidebar .v-list-item__icon {
  margin-right: 16px;
}

.sidebar .v-list-item__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

</style>
