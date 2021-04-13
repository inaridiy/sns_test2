<template>
  <v-sheet color="grey lighten-4" class="pa-4">
    <v-avatar class="mb-4" color="grey darken-1" size="64"
      ><v-img :src="getIcon(user.icon)"></v-img
    ></v-avatar>
    <v-btn icon to="/management/me"> <v-icon>mdi-cog</v-icon></v-btn>
    <div>
      {{ user.name }}
    </div>
  </v-sheet>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    getIcon() {
      return value => (value ? this.$config.apiURL + "/" + value : "/icon.png");
    },
    ...mapState("auth", ["user"])
  }
};
</script>
