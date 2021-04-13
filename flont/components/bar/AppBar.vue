<template>
  <v-app-bar app clipped-right flat>
    <v-app-bar-nav-icon @click="openNavi"></v-app-bar-nav-icon>

    <v-app-bar-title>{{ server.name }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-dialog
      v-model="dialog"
      width="500"
      v-if="server.user_id === $auth.user.id"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn depressed v-bind="attrs" v-on="on">
          チャンネル作成
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          チャンネル作成
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-text-field
            label="チャンネルネームプリーズ"
            v-model="server_name"
          ></v-text-field>
          <v-btn depressed color="primary" text @click="createServer">
            作成
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn icon @click="openNaviRight">
      <v-icon>mdi-account</v-icon>
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
  data: () => ({ dialog: false, server_name: "" }),
  computed: {
    getURL() {
      const { server_id } = this.$route.params;
      return value => `/channel/${server_id}/${value}`;
    },
    ...mapState("server", ["server"])
  },
  methods: {
    async createServer() {
      this.dialog = false;
      try {
        await this.$axios.$post("/management/channel", {
          name: this.server_name,
          server_id: this.$route.params.server_id
        });
        location.reload();
      } catch (e) {
        console.log(e);
      }
    },
    ...mapMutations("channel", ["openNavi", "openNaviRight"])
  }
};
</script>
