<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="openNavi"></v-app-bar-nav-icon>

    <v-app-bar-title>{{ server.name }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <template v-slot:extension v-if="$route.params.server_id">
      <v-tabs
        align-with-title
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tab
          v-for="channel in server.channels"
          :key="channel.id"
          :to="getURL(channel.id)"
          >{{ channel.name }}</v-tab
        >
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    getURL() {
      const { server_id } = this.$route.params;
      return value => `/channel/${server_id}/${value}`;
    },
    ...mapState("server", ["server"])
  },
  methods: {
    ...mapMutations("channel", ["openNavi"])
  }
};
</script>
