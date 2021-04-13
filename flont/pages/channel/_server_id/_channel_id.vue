<template>
  <v-main>
    <v-container v-if="$route.params.channel_id">
      <v-form @submit.prevent="sendMessage">
        <v-text-field
          dense
          flat
          outlined
          rounded
          solo
          v-model="message"
        ></v-text-field
      ></v-form>
      <v-list>
        <v-list-item v-for="msg in sortMessages" :key="msg.id" link>
          <v-list-item-avatar>
            <v-img :src="getIcon(msg.user_id)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              getUserName(msg.user_id)
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-1">{{
              msg.text
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container v-else
      ><h2 class="text-h4">
        メニューからサーバーを選択するのじゃ
      </h2></v-container
    >
  </v-main>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({ showFileinput: false, message: "" }),
  methods: {
    async sendMessage() {
      await this.$axios
        .$post("/msg", {
          message: this.message,
          channel_id: this.$route.params.channel_id
        })
        .catch(e => console.log(e.response));
      this.message = "";
    }
  },
  computed: {
    getIcon() {
      return user_id => {
        const users = this.users[this.$route.params.server_id];
        if (users) {
          const user = users.find(user => user.id === user_id);

          return user.icon
            ? this.$config.apiURL + "/" + user.icon
            : "/icon.png";
        }
      };
    },
    getUserName() {
      return user_id => {
        const users = this.users[this.$route.params.server_id];
        if (users) {
          return (
            users.find(user => user.id === user_id).name || "不明なユーザー"
          );
        }
      };
    },
    getURL() {
      return server_id => `/channel/${server_id}`;
    },
    sortMessages() {
      return this.messages[this.$route.params.channel_id]
        ? Object.values(this.messages[this.$route.params.channel_id]).sort(
            (a, b) => b.id - a.id
          )
        : [];
    },
    ...mapState("server", ["messages", "users"])
  }
};
</script>
