<template>
  <v-container>
    <FormCard title="招待コード">
      <v-card-title>{{ token }}</v-card-title>
      <v-card-subtitle>このコードを共有しよう</v-card-subtitle></FormCard
    >
    <transition
      ><v-alert
        v-if="error"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        {{ error }}
      </v-alert></transition
    >
  </v-container>
</template>

<script>
import FormCard from "~/components/form/formCard.vue";

export default {
  components: { FormCard },
  data() {
    return {
      error: "",
      token: ""
    };
  },
  async mounted() {
    if (!this.$route.params.server_id) return;
    try {
      const token = await this.$axios.$get("/management/invitation", {
        params: {
          server_id: this.$route.params.server_id
        }
      });
      this.token = token.token;
    } catch (e) {
      this.error = "エラーが発生しました";
    }
  }
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
