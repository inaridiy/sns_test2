<template>
  <v-text-field
    :type="showPassword ? 'text' : 'password'"
    @click:append="showPassword = !showPassword"
    v-model="setEmail"
    :disabled="disabled"
    :rules="rules"
    prepend-icon="mdi-lock"
    append-icon="mdi-eye-off"
    label="パスワード"
  />
</template>
<script>
export default {
  data() {
    return {
      showPassword: false,
      rules: [(value) => !!value || "必ず入力してください"],
    };
  },

  props: {
    password: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    setEmail: {
      get() {
        return this.password;
      },
      set(newVal) {
        return this.$emit("update:password", newVal);
      },
    },
  },
};
</script>
