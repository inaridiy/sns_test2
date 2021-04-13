<template>
  <v-container>
    <h1 class="text-h1">SNSの試作品だよぉ</h1>
    <v-btn to="/auth/login">ログイン</v-btn
    ><v-btn to="/auth/register">登録</v-btn></v-container
  >
</template>

<script>
export default {
  auth: false,
  data() {
    return { tweet: { text: "" } };
  },
  methods: {}
};
</script>
