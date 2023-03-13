<template>
  <div></div>
</template>

<script>
import users from "../store/users";
export default {
  name: "Users",

  data() {
    return {};
  },

  async mounted() {
    try {
      await Promise.all([
        users.dispatch("getAllUsers"),
      ]);
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    getAllUsers() {
      return users.state.allUsers;
    },
  },

  methods: {},
};
</script>
