<template>
  <v-sheet color="grey lighten-4" class="pa-4">
    <v-avatar class="mb-4" color="grey darken-1" size="64"
      ><v-img :src="user.icon || `/icon.png`"></v-img
    ></v-avatar>

    <div>{{ user.name }}</div>
  </v-sheet>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["user"])
  }
};
</script>
