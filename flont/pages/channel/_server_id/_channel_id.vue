<template> </template>
<script>
export default {
  data: () => ({ showFileinput: false, text: "" }),
  methods: {
    async sendMessage() {
      await this.$axios
        .$post("/msg", {
          message: this.text,
          channel_id: this.$route.params.channel_id
        })
        .catch(e => console.log(e.response));
      this.text = "";
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
