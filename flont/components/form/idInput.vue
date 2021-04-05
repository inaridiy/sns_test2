<template>
  <v-text-field
    v-model="setEmail"
    :disabled="disabled"
    :rules="rules"
    label="IDを入力"
    prepend-icon="mdi-identifier"
    placeholder="yourID"
  >
  </v-text-field>
</template>
<script>
export default {
  data() {
    return {
      rules: [(value) => !!value || "必ず入力してください"],
    };
  },
  props: {
    id: {
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
        return this.id;
      },
      set(newVal) {
        return this.$emit("update:id", newVal);
      },
    },
  },
};
</script>
