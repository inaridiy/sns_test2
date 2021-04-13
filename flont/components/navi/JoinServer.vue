<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" depressed v-bind="attrs" v-on="on">
          サーバー、入っちゃう？
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          招待コード入力
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-text-field
            label="招待コードプリーズ"
            v-model="server_name"
          ></v-text-field>
          <v-btn depressed color="primary" text @click="createServer">
            接続
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({ dialog: false, server_name: "" }),
  methods: {
    async createServer() {
      this.dialog = false;
      try {
        await this.$axios.$post("/join", {
          token: this.server_name
        });
        location.reload();
      } catch (e) {
        console.log(e);
      }
    },
    ...mapActions("server", ["setup"])
  }
};
</script>
