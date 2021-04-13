<template>
  <v-text-field
    v-model="setEmail"
    :disabled="disabled"
    :rules="rules"
    label="一言"
    prepend-icon="mdi-comment-processing-outline"
    placeholder="ピーナッツが大好きです"
  >
  </v-text-field>
</template>
<script>
export default {
  data() {
    return {
      rules: [value => !!value || "必ず入力してください"]
    };
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setEmail: {
      get() {
        return this.name;
      },
      set(newVal) {
        return this.$emit("update:name", newVal);
      }
    }
  }
};
</script>
