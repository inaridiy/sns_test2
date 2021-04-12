<template>
  <v-main>
    <v-container>
      <v-form>
        <v-text-field
          dense
          flat
          outlined
          rounded
          solo
          v-model="message"
          @submit.prevent="sendMessage"
        ></v-text-field></v-form
    ></v-container>
  </v-main>
</template>
<script>
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
      return value => value || "/icon.png";
    },
    getURL() {
      return server_id => `/channel/${server_id}`;
    }
  }
};
</script>
