<template>
  <v-navigation-drawer :value.sync="drawer" app>
    <ShowMe />
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="server in servers"
        :key="server.id"
        link
        :to="getURL(server.id)"
      >
        <v-list-item-avatar>
          <v-img :src="getIcon(server.icon)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ server.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import ShowMe from "~/components/navi/ShowMe";
import { mapState } from "vuex";
export default {
  components: { ShowMe },
  computed: {
    getIcon() {
      return value => value || "/icon.png";
    },
    getURL() {
      return server_id => `/channel/${server_id}`;
    },
    ...mapState("server", ["servers"]),
    ...mapState("channel", ["drawer"])
  }
};
</script>
